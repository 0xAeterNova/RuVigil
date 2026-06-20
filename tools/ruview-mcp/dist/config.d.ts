/**
 * Configuration loader for the RuVigil MCP server.
 *
 * All settings can be overridden via environment variables.  No config file is
 * required — the server is designed to work out of the box with a locally-running
 * sensing-server on the default port.
 */
import type { RuviewConfig } from "./types.js";
/**
 * Load the effective RuviewConfig from environment variables.
 *
 * Environment variables:
 *   RUVIEW_SENSING_SERVER_URL   — base URL of the sensing-server  (default: http://localhost:3000)
 *   RUVIEW_API_TOKEN            — Bearer token for /api/v1/* routes (no default; auth disabled when absent)
 *   RUVIEW_POSE_COG_BINARY      — path to cog-pose-estimation binary
 *   RUVIEW_COUNT_COG_BINARY     — path to cog-person-count binary
 *   RUVIEW_JOBS_DIR             — directory for job logs (default: ~/.ruview/jobs)
 */
export declare function loadConfig(): RuviewConfig;
//# sourceMappingURL=config.d.ts.map