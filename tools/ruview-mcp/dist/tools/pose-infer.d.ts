/**
 * MCP tool: ruview_pose_infer
 *
 * Run a single-shot pose estimation inference against a CSI window.
 *
 * M1 (this file): stubs the inference after verifying the cog binary is healthy.
 * M2 wires the real forward pass via the sensing-server CSI window + cog `run`.
 *
 * The 17 COCO keypoints in the output follow the standard COCO body ordering:
 *   0=nose, 1=left_eye, 2=right_eye, 3=left_ear, 4=right_ear,
 *   5=left_shoulder, 6=right_shoulder, 7=left_elbow, 8=right_elbow,
 *   9=left_wrist, 10=right_wrist, 11=left_hip, 12=right_hip,
 *   13=left_knee, 14=right_knee, 15=left_ankle, 16=right_ankle
 */
import { z } from "zod";
import type { RuviewConfig } from "../types.js";
export declare const poseInferSchema: z.ZodObject<{
    /**
     * Path to a CSI window JSON file (as produced by ruview_csi_latest or
     * examples/research-sota/r5_subcarrier_saliency.py).
     * Optional — when absent, uses the latest window from the sensing-server.
     */
    window_path: z.ZodOptional<z.ZodString>;
    /** Override the cog binary path for this call. */
    cog_binary: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    window_path?: string | undefined;
    cog_binary?: string | undefined;
}, {
    window_path?: string | undefined;
    cog_binary?: string | undefined;
}>;
export type PoseInferInput = z.infer<typeof poseInferSchema>;
export declare function poseInfer(input: PoseInferInput, config: RuviewConfig): Promise<object>;
//# sourceMappingURL=pose-infer.d.ts.map