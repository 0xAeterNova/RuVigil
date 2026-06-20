/**
 * Shared Zod sub-schemas reused across the ADR-124 §4.1 tool catalog.
 *
 * All constraints are sourced from the ADR-124 decision record; comments cite
 * the specific table row or section that defines the constraint.
 */
import { z } from "zod";
/**
 * Optional node_id — present on almost every tool. Defaults to the single
 * active node when only one is registered; required for multi-node fleets.
 */
export declare const NodeIdSchema: z.ZodOptional<z.ZodString>;
/**
 * Subscription duration in seconds. ADR-124 policy layer caps this at the
 * value returned by ruview.policy.can_subscribe.max_duration_s; the schema
 * enforces a hard ceiling of 3600 s (1 h) as a first-line guard.
 */
export declare const DurationSSchema: z.ZodNumber;
/**
 * Optional window in seconds for vitals averaging. Positive, max 300 s.
 * ADR-124 §4.1 rows vitals.get_breathing / vitals.get_heart_rate.
 */
export declare const WindowSSchema: z.ZodOptional<z.ZodNumber>;
/**
 * The 10 semantic primitive kinds defined in ADR-115 and mirrored in
 * python/wifi_densepose/client/primitives.py:36-45.
 */
export declare const SemanticPrimitiveKindSchema: z.ZodEnum<["presence", "n_persons", "fall_detected", "breathing_rate", "heart_rate", "body_temperature", "gesture", "zone_entry", "zone_exit", "movement_intensity", "sleep_quality"]>;
export type SemanticPrimitiveKind = z.infer<typeof SemanticPrimitiveKindSchema>;
/**
 * A single 17-keypoint COCO pose result as stored and returned by the
 * ruvector HNSW index (ADR-016). Used by ruview.vector.store_pose input.
 */
export declare const PosePersonResultSchema: z.ZodObject<{
    keypoints: z.ZodArray<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>, "many">;
    confidence: z.ZodNumber;
    person_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    keypoints: [number, number][];
    confidence: number;
    person_id?: string | undefined;
}, {
    keypoints: [number, number][];
    confidence: number;
    person_id?: string | undefined;
}>;
export type PosePersonResult = z.infer<typeof PosePersonResultSchema>;
//# sourceMappingURL=common.d.ts.map