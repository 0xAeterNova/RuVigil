/**
 * Streamable HTTP transport scaffold for @ruvnet/rvagent (ADR-124 §3).
 *
 * Binds to 127.0.0.1 by default and mounts a POST /mcp endpoint backed by
 * StreamableHTTPServerTransport from @modelcontextprotocol/sdk.
 *
 * Security model (ADR-124 §6):
 *   - Origin validation: requests from origins other than the configured
 *     allowlist are rejected with 403 Forbidden before reaching the MCP layer.
 *   - Default allowlist: ['http://localhost', 'http://127.0.0.1'] — covers
 *     Claude Code and Cursor on the same machine.
 *   - Bearer token: when RVAGENT_HTTP_TOKEN is set, requests must carry
 *     Authorization: Bearer <token>; missing/wrong tokens → 401.
 *   - Bind address: defaults to 127.0.0.1 per MCP spec security requirement.
 *     Set RVAGENT_HTTP_HOST=0.0.0.0 only for intentional fleet deployment.
 *
 * Usage:
 *   import { createHttpTransport } from './http-transport.js';
 *   const { server: httpServer, transport } = await createHttpTransport(mcpServer);
 *   // httpServer is a node:http.Server — call httpServer.close() to shut down.
 */
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 3001;
const LOCALHOST_ORIGINS = new Set([
    "http://localhost",
    "http://127.0.0.1",
    "https://localhost",
    "https://127.0.0.1",
]);
/**
 * Validate Origin header against the allowlist.
 * Returns true if the request should be allowed, false if it should be rejected.
 *
 * An absent Origin header is allowed (same-origin non-browser requests, curl, etc.).
 * A present Origin that is not in the allowlist is rejected.
 */
export function isOriginAllowed(origin, allowedOrigins) {
    if (origin === undefined)
        return true; // no Origin = not a cross-origin browser request
    if (allowedOrigins.includes("*"))
        return true;
    return allowedOrigins.some((o) => o === origin);
}
/**
 * Build and wire a Streamable HTTP transport to the provided MCP server.
 * Returns the Node.js HTTP server (not yet listening) plus the transport.
 * Call httpServer.listen(port, host) or rely on createHttpTransport which
 * does that for you.
 */
export function buildHttpApp(mcpServer, opts = {}) {
    const allowedOrigins = opts.allowedOrigins ?? [
        ...LOCALHOST_ORIGINS,
    ];
    const bearerToken = opts.bearerToken ?? process.env["RVAGENT_HTTP_TOKEN"];
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
    });
    const httpServer = createServer((req, res) => {
        // ── Origin validation ────────────────────────────────────────────────
        const origin = req.headers["origin"];
        if (!isOriginAllowed(origin, allowedOrigins)) {
            res.writeHead(403, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Forbidden: cross-origin request rejected" }));
            return;
        }
        // ── Bearer token auth ────────────────────────────────────────────────
        if (bearerToken !== undefined && bearerToken !== "") {
            const authHeader = req.headers["authorization"];
            const supplied = authHeader?.startsWith("Bearer ")
                ? authHeader.slice("Bearer ".length)
                : undefined;
            if (supplied !== bearerToken) {
                res.writeHead(401, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Unauthorized: missing or invalid bearer token" }));
                return;
            }
        }
        // ── Route: POST /mcp ─────────────────────────────────────────────────
        if (req.method === "POST" && req.url === "/mcp") {
            let body = "";
            req.on("data", (chunk) => { body += chunk.toString(); });
            req.on("end", () => {
                let parsed;
                try {
                    parsed = JSON.parse(body);
                }
                catch {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Bad Request: invalid JSON body" }));
                    return;
                }
                void transport.handleRequest(req, res, parsed);
            });
            return;
        }
        // ── Fallback ─────────────────────────────────────────────────────────
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Not found. MCP endpoint: POST /mcp" }));
    });
    return { httpServer, transport };
}
/**
 * Create and start the Streamable HTTP transport, resolving once the server
 * is bound and listening.
 */
export async function createHttpTransport(mcpServer, opts = {}) {
    const host = opts.host ?? process.env["RVAGENT_HTTP_HOST"] ?? DEFAULT_HOST;
    const port = opts.port ?? Number(process.env["RVAGENT_HTTP_PORT"] ?? DEFAULT_PORT);
    const { httpServer, transport } = buildHttpApp(mcpServer, opts);
    // Wire MCP server to the transport only after the HTTP server is built.
    // Cast needed: StreamableHTTPServerTransport implements Transport but
    // exactOptionalPropertyTypes causes a false incompatibility on optional
    // callback properties; the cast is safe — the SDK types are consistent.
    await mcpServer.connect(transport);
    await new Promise((resolve, reject) => {
        httpServer.once("error", reject);
        httpServer.listen(port, host, () => resolve());
    });
    return {
        httpServer,
        transport,
        boundAddress: `http://${host}:${port}`,
    };
}
//# sourceMappingURL=http-transport.js.map