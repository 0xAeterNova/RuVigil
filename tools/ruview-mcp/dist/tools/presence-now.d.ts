/**
 * MCP tool: ruview.presence.now (ADR-124 §4.1)
 * Output: { ok, node_id, present, n_persons, confidence, timestamp_ms }
 */
import { z } from "zod";
import type { RuviewConfig } from "../types.js";
export declare const presenceNowSchema: z.ZodObject<{
    node_id: z.ZodOptional<z.ZodString>;
    sensing_server_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    sensing_server_url?: string | undefined;
    node_id?: string | undefined;
}, {
    sensing_server_url?: string | undefined;
    node_id?: string | undefined;
}>;
export type PresenceNowInput = z.infer<typeof presenceNowSchema>;
export declare function presenceNow(input: PresenceNowInput, config: RuviewConfig): Promise<object>;
//# sourceMappingURL=presence-now.d.ts.map