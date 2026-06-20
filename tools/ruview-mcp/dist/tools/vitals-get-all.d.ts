/**
 * MCP tool: ruview.vitals.get_all (ADR-124 §4.1)
 * Output: EdgeVitalsResult — full EdgeVitalsMessage minus `raw`.
 */
import { z } from "zod";
import type { RuviewConfig } from "../types.js";
export declare const vitalsGetAllSchema: z.ZodObject<{
    node_id: z.ZodOptional<z.ZodString>;
    sensing_server_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    sensing_server_url?: string | undefined;
    node_id?: string | undefined;
}, {
    sensing_server_url?: string | undefined;
    node_id?: string | undefined;
}>;
export type VitalsGetAllInput = z.infer<typeof vitalsGetAllSchema>;
export declare function vitalsGetAll(input: VitalsGetAllInput, config: RuviewConfig): Promise<object>;
//# sourceMappingURL=vitals-get-all.d.ts.map