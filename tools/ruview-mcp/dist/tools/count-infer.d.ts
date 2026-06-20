/**
 * MCP tool: ruview_count_infer
 *
 * Run a single-shot person-count inference against a CSI window.
 *
 * Uses the cog-person-count binary (ADR-103).  The output includes a
 * calibrated confidence score and a 95% prediction interval, matching the
 * Stoer-Wagner + confidence-weighted log-sum fusion design in ADR-103.
 *
 * M1 (this file): stubs the inference after verifying the cog binary is healthy.
 * M2 wires the real forward pass.
 */
import { z } from "zod";
import type { RuviewConfig } from "../types.js";
export declare const countInferSchema: z.ZodObject<{
    /**
     * Path to a CSI window JSON file.
     * Optional — when absent, uses the latest window from the sensing-server.
     */
    window_path: z.ZodOptional<z.ZodString>;
    /** Override the cog binary path for this call. */
    cog_binary: z.ZodOptional<z.ZodString>;
    /**
     * Maximum number of persons to consider in the output distribution.
     * Capped at 7 per the count head's softmax over {0..7}.
     */
    max_persons: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    max_persons: number;
    window_path?: string | undefined;
    cog_binary?: string | undefined;
}, {
    window_path?: string | undefined;
    cog_binary?: string | undefined;
    max_persons?: number | undefined;
}>;
export type CountInferInput = z.infer<typeof countInferSchema>;
export declare function countInfer(input: CountInferInput, config: RuviewConfig): Promise<object>;
//# sourceMappingURL=count-infer.d.ts.map