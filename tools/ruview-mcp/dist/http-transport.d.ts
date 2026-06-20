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
import { type Server as HttpServer } from "node:http";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { Server as McpServer } from "@modelcontextprotocol/sdk/server/index.js";
export interface HttpTransportOptions {
    /** TCP host to bind (default: 127.0.0.1). */
    host?: string;
    /** TCP port to listen on (default: 3001). */
    port?: number;
    /**
     * Allowed Origin header values. Requests with an Origin not in this list
     * are rejected with 403. Use '*' to disable Origin validation entirely
     * (not recommended outside of local-dev flags).
     */
    allowedOrigins?: string[];
    /**
     * Bearer token for HTTP transport. When set, every request must supply
     * Authorization: Bearer <token>; omitted or wrong token → 401.
     * Defaults to process.env.RVAGENT_HTTP_TOKEN (undefined = auth disabled).
     */
    bearerToken?: string;
}
export interface HttpTransportResult {
    /** The raw Node.js HTTP server — call .close() to shut down. */
    httpServer: HttpServer;
    /** The MCP Streamable HTTP transport instance wired to the MCP server. */
    transport: StreamableHTTPServerTransport;
    /** The bound address string (e.g. "http://127.0.0.1:3001"). */
    boundAddress: string;
}
/**
 * Validate Origin header against the allowlist.
 * Returns true if the request should be allowed, false if it should be rejected.
 *
 * An absent Origin header is allowed (same-origin non-browser requests, curl, etc.).
 * A present Origin that is not in the allowlist is rejected.
 */
export declare function isOriginAllowed(origin: string | undefined, allowedOrigins: string[]): boolean;
/**
 * Build and wire a Streamable HTTP transport to the provided MCP server.
 * Returns the Node.js HTTP server (not yet listening) plus the transport.
 * Call httpServer.listen(port, host) or rely on createHttpTransport which
 * does that for you.
 */
export declare function buildHttpApp(mcpServer: McpServer, opts?: HttpTransportOptions): {
    httpServer: HttpServer;
    transport: StreamableHTTPServerTransport;
};
/**
 * Create and start the Streamable HTTP transport, resolving once the server
 * is bound and listening.
 */
export declare function createHttpTransport(mcpServer: McpServer, opts?: HttpTransportOptions): Promise<HttpTransportResult>;
//# sourceMappingURL=http-transport.d.ts.map