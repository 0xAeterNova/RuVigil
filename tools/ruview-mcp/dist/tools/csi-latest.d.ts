/**
 * MCP tool: ruview_csi_latest
 *
 * Pull the most recent CSI window from the local sensing-server.
 * Wraps GET /api/v1/sensing/latest (ADR-102 endpoint, schema version 2).
 *
 * Returns the full CsiWindow JSON so the calling agent can inspect raw
 * subcarrier data, feed it to ruview_pose_infer, or store it for analysis.
 */
import { z } from "zod";
import type { RuviewConfig } from "../types.js";
export declare const csiLatestSchema: z.ZodObject<{
    /** Override the sensing-server URL for this call only. */
    sensing_server_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    sensing_server_url?: string | undefined;
}, {
    sensing_server_url?: string | undefined;
}>;
export type CsiLatestInput = z.infer<typeof csiLatestSchema>;
export declare function csiLatest(input: CsiLatestInput, config: RuviewConfig): Promise<object>;
//# sourceMappingURL=csi-latest.d.ts.map