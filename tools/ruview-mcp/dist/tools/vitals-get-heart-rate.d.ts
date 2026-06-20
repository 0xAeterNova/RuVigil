/**
 * MCP tool: ruview.vitals.get_heart_rate (ADR-124 §4.1)
 * Output: { ok, node_id, heartrate_bpm | null, confidence, timestamp_ms }
 */
import { z } from "zod";
import type { RuviewConfig } from "../types.js";
export declare const vitalsGetHeartRateSchema: z.ZodObject<{
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
export type VitalsGetHeartRateInput = z.infer<typeof vitalsGetHeartRateSchema>;
export declare function vitalsGetHeartRate(input: VitalsGetHeartRateInput, config: RuviewConfig): Promise<object>;
//# sourceMappingURL=vitals-get-heart-rate.d.ts.map