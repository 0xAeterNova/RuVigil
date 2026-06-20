/**
 * MCP tool: ruview_train_count + ruview_job_status
 *
 * Kick off a cog-person-count training run and poll its status.
 *
 * The training pipeline used here is the Candle GPU trainer from
 * `v2/crates/wifi-densepose-train` — the same one that produced
 * `count_v1.safetensors` in 2.1 s on the RTX 5080 (ADR-103).
 *
 * The MCP server shells out to `cargo run -p wifi-densepose-train --` with the
 * paired JSONL path as input, redirecting stdout/stderr to a log file.  The
 * returned job_id can be used with ruview_job_status to poll progress.
 *
 * M1: job is enqueued (background process spawned, log file created).
 * M4: full training arguments + real output artifact path returned.
 */
import { z } from "zod";
import type { RuviewConfig } from "../types.js";
export declare const trainCountSchema: z.ZodObject<{
    /**
     * Path to the paired JSONL file for training.
     * Produced by scripts/align-ground-truth.js.
     * E.g. data/paired/wiflow-p7-2026-05-19.paired.jsonl
     */
    paired_jsonl: z.ZodString;
    /** Number of training epochs (default: 400, matching ADR-103 recipe). */
    epochs: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    /**
     * Learning rate.  The ADR-103 recipe uses 1e-3 with frozen encoder for the
     * first 50 epochs, then 1e-4 for joint fine-tuning.
     */
    learning_rate: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    /** Directory where the trained model artifacts are written. */
    output_dir: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    paired_jsonl: string;
    epochs: number;
    learning_rate: number;
    output_dir?: string | undefined;
}, {
    paired_jsonl: string;
    epochs?: number | undefined;
    learning_rate?: number | undefined;
    output_dir?: string | undefined;
}>;
export type TrainCountInput = z.infer<typeof trainCountSchema>;
export declare const jobStatusSchema: z.ZodObject<{
    job_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    job_id: string;
}, {
    job_id: string;
}>;
export type JobStatusInput = z.infer<typeof jobStatusSchema>;
export declare function trainCount(input: TrainCountInput, config: RuviewConfig): Promise<object>;
export declare function jobStatus(input: JobStatusInput, _config: RuviewConfig): Promise<object>;
//# sourceMappingURL=train-count.d.ts.map