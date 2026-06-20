/**
 * MCP tool: ruview.vitals.get_breathing (ADR-124 §4.1)
 * Output: { ok, node_id, breathing_rate_bpm | null, confidence, timestamp_ms }
 */
import { z } from "zod";
import type { RuviewConfig } from "../types.js";
export declare const vitalsGetBreathingSchema: z.ZodObject<{
    node_id: z.ZodOptional<z.ZodString>;
    window_s: z.ZodOptional<z.ZodNumber>;
    sensing_server_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    sensing_server_url?: string | undefined;
    node_id?: string | undefined;
    window_s?: number | undefined;
}, {
    sensing_server_url?: string | undefined;
    node_id?: string | undefined;
    window_s?: number | undefined;
}>;
export type VitalsGetBreathingInput = z.infer<typeof vitalsGetBreathingSchema>;
export declare function vitalsGetBreathing(input: VitalsGetBreathingInput, config: RuviewConfig): Promise<object>;
//# sourceMappingURL=vitals-get-breathing.d.ts.map