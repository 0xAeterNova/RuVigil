#!/usr/bin/env node
/**
 * @ruv/ruview-mcp - RuVigil MCP Server
 *
 * Exposes RuVigil sensing capabilities as Model Context Protocol
 * (MCP) tools that Claude Code, Cursor, Codex, and other MCP-compatible agents
 * can call directly.
 *
 * Tools exposed:
 *   ruview_csi_latest    — pull the latest CSI window from the sensing-server
 *   ruview_pose_infer    — single-shot 17-keypoint pose estimation
 *   ruview_count_infer   — single-shot person count with confidence interval
 *   ruview_registry_list — list cogs from the Cognitum edge registry (ADR-102)
 *   ruview_train_count   — kick off a count-cog training run (returns job ID)
 *   ruview_job_status    — poll a background training job
 *
 * Usage:
 *   node dist/index.js                   # stdio transport (default)
 *   RUVIEW_SENSING_SERVER_URL=http://cognitum-v0:3000 node dist/index.js
 *
 * To register with Claude Code:
 *   claude mcp add ruview -- node /path/to/tools/ruview-mcp/dist/index.js
 *
 * See ADR-104 for the full design rationale and security model.
 */
export {};
//# sourceMappingURL=index.d.ts.map