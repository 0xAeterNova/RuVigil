/**
 * Zod input schemas for all 20 ADR-124 MCP tools.
 *
 * §4.1  — 15 sensing tools (presence, vitals, pose, primitives, bfld, node, vector)
 * §4.1a — 5 policy / governance tools (RUVIEW-POLICY)
 *
 * Each exported schema is named `<CamelCase>InputSchema` matching the tool
 * name from the ADR-124 §4.1 catalog table. The parallel `TOOL_NAMES` array
 * is the single source of truth asserted by the schema-coverage test.
 */
import { z } from "zod";
/** ruview.presence.now */
export declare const PresenceNowInputSchema: z.ZodObject<{
    node_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    node_id?: string | undefined;
}, {
    node_id?: string | undefined;
}>;
/** ruview.vitals.get_breathing */
export declare const VitalsGetBreathingInputSchema: z.ZodObject<{
    node_id: z.ZodOptional<z.ZodString>;
    window_s: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    node_id?: string | undefined;
    window_s?: number | undefined;
}, {
    node_id?: string | undefined;
    window_s?: number | undefined;
}>;
/** ruview.vitals.get_heart_rate */
export declare const VitalsGetHeartRateInputSchema: z.ZodObject<{
    node_id: z.ZodOptional<z.ZodString>;
    window_s: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    node_id?: string | undefined;
    window_s?: number | undefined;
}, {
    node_id?: string | undefined;
    window_s?: number | undefined;
}>;
/** ruview.vitals.get_all */
export declare const VitalsGetAllInputSchema: z.ZodObject<{
    node_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    node_id?: string | undefined;
}, {
    node_id?: string | undefined;
}>;
/** ruview.pose.latest */
export declare const PoseLatestInputSchema: z.ZodObject<{
    node_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    node_id?: string | undefined;
}, {
    node_id?: string | undefined;
}>;
/** ruview.pose.subscribe */
export declare const PoseSubscribeInputSchema: z.ZodObject<{
    node_id: z.ZodOptional<z.ZodString>;
    duration_s: z.ZodNumber;
    callback_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    duration_s: number;
    node_id?: string | undefined;
    callback_url?: string | undefined;
}, {
    duration_s: number;
    node_id?: string | undefined;
    callback_url?: string | undefined;
}>;
/** ruview.primitives.get */
export declare const PrimitivesGetInputSchema: z.ZodObject<{
    node_id: z.ZodOptional<z.ZodString>;
    primitive: z.ZodEnum<["presence", "n_persons", "fall_detected", "breathing_rate", "heart_rate", "body_temperature", "gesture", "zone_entry", "zone_exit", "movement_intensity", "sleep_quality"]>;
}, "strip", z.ZodTypeAny, {
    primitive: "presence" | "n_persons" | "fall_detected" | "breathing_rate" | "heart_rate" | "body_temperature" | "gesture" | "zone_entry" | "zone_exit" | "movement_intensity" | "sleep_quality";
    node_id?: string | undefined;
}, {
    primitive: "presence" | "n_persons" | "fall_detected" | "breathing_rate" | "heart_rate" | "body_temperature" | "gesture" | "zone_entry" | "zone_exit" | "movement_intensity" | "sleep_quality";
    node_id?: string | undefined;
}>;
/** ruview.primitives.list_active */
export declare const PrimitivesListActiveInputSchema: z.ZodObject<{
    node_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    node_id?: string | undefined;
}, {
    node_id?: string | undefined;
}>;
/** ruview.primitives.subscribe */
export declare const PrimitivesSubscribeInputSchema: z.ZodObject<{
    node_id: z.ZodOptional<z.ZodString>;
    primitive: z.ZodOptional<z.ZodEnum<["presence", "n_persons", "fall_detected", "breathing_rate", "heart_rate", "body_temperature", "gesture", "zone_entry", "zone_exit", "movement_intensity", "sleep_quality"]>>;
    duration_s: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    duration_s: number;
    node_id?: string | undefined;
    primitive?: "presence" | "n_persons" | "fall_detected" | "breathing_rate" | "heart_rate" | "body_temperature" | "gesture" | "zone_entry" | "zone_exit" | "movement_intensity" | "sleep_quality" | undefined;
}, {
    duration_s: number;
    node_id?: string | undefined;
    primitive?: "presence" | "n_persons" | "fall_detected" | "breathing_rate" | "heart_rate" | "body_temperature" | "gesture" | "zone_entry" | "zone_exit" | "movement_intensity" | "sleep_quality" | undefined;
}>;
/** ruview.bfld.last_scan */
export declare const BfldLastScanInputSchema: z.ZodObject<{
    node_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    node_id?: string | undefined;
}, {
    node_id?: string | undefined;
}>;
/** ruview.bfld.subscribe */
export declare const BfldSubscribeInputSchema: z.ZodObject<{
    node_id: z.ZodOptional<z.ZodString>;
    duration_s: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    duration_s: number;
    node_id?: string | undefined;
}, {
    duration_s: number;
    node_id?: string | undefined;
}>;
/** ruview.node.list — empty input per ADR-124 §4.1 table */
export declare const NodeListInputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
/** ruview.node.status */
export declare const NodeStatusInputSchema: z.ZodObject<{
    node_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    node_id: string;
}, {
    node_id: string;
}>;
/** ruview.vector.search_pose */
export declare const VectorSearchPoseInputSchema: z.ZodObject<{
    query_embedding: z.ZodArray<z.ZodNumber, "many">;
    k: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    node_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    query_embedding: number[];
    k: number;
    node_id?: string | undefined;
}, {
    query_embedding: number[];
    node_id?: string | undefined;
    k?: number | undefined;
}>;
/** ruview.vector.store_pose */
export declare const VectorStorePoseInputSchema: z.ZodObject<{
    pose: z.ZodObject<{
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
    node_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    node_id: string;
    pose: {
        keypoints: [number, number][];
        confidence: number;
        person_id?: string | undefined;
    };
}, {
    node_id: string;
    pose: {
        keypoints: [number, number][];
        confidence: number;
        person_id?: string | undefined;
    };
}>;
/** ruview.policy.can_access_vitals */
export declare const PolicyCanAccessVitalsInputSchema: z.ZodObject<{
    agent_id: z.ZodString;
    node_id: z.ZodString;
    vital: z.ZodEnum<["breathing", "heart_rate", "body_temperature", "all"]>;
}, "strip", z.ZodTypeAny, {
    node_id: string;
    agent_id: string;
    vital: "heart_rate" | "body_temperature" | "breathing" | "all";
}, {
    node_id: string;
    agent_id: string;
    vital: "heart_rate" | "body_temperature" | "breathing" | "all";
}>;
/** ruview.policy.can_query_presence */
export declare const PolicyCanQueryPresenceInputSchema: z.ZodObject<{
    agent_id: z.ZodString;
    scope: z.ZodEnum<["node", "fleet"]>;
    node_id: z.ZodOptional<z.ZodString>;
    zone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    agent_id: string;
    scope: "node" | "fleet";
    node_id?: string | undefined;
    zone?: string | undefined;
}, {
    agent_id: string;
    scope: "node" | "fleet";
    node_id?: string | undefined;
    zone?: string | undefined;
}>;
/** ruview.policy.can_subscribe */
export declare const PolicyCanSubscribeInputSchema: z.ZodObject<{
    agent_id: z.ZodString;
    topic: z.ZodString;
    duration_s: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    duration_s: number;
    agent_id: string;
    topic: string;
}, {
    duration_s: number;
    agent_id: string;
    topic: string;
}>;
/** ruview.policy.redact_identity_fields */
export declare const PolicyRedactIdentityFieldsInputSchema: z.ZodObject<{
    payload: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    agent_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    agent_id: string;
    payload: Record<string, unknown>;
}, {
    agent_id: string;
    payload: Record<string, unknown>;
}>;
/** ruview.policy.audit_log */
export declare const PolicyAuditLogInputSchema: z.ZodObject<{
    agent_id: z.ZodOptional<z.ZodString>;
    since_ts: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    agent_id?: string | undefined;
    since_ts?: number | undefined;
}, {
    agent_id?: string | undefined;
    since_ts?: number | undefined;
}>;
/**
 * Single source of truth: every tool name in the ADR-124 §4.1 + §4.1a catalog.
 * The schema-coverage test asserts this list exactly matches the exported schemas.
 */
export declare const TOOL_NAMES: readonly ["ruview.presence.now", "ruview.vitals.get_breathing", "ruview.vitals.get_heart_rate", "ruview.vitals.get_all", "ruview.pose.latest", "ruview.pose.subscribe", "ruview.primitives.get", "ruview.primitives.list_active", "ruview.primitives.subscribe", "ruview.bfld.last_scan", "ruview.bfld.subscribe", "ruview.node.list", "ruview.node.status", "ruview.vector.search_pose", "ruview.vector.store_pose", "ruview.policy.can_access_vitals", "ruview.policy.can_query_presence", "ruview.policy.can_subscribe", "ruview.policy.redact_identity_fields", "ruview.policy.audit_log"];
export type ToolName = (typeof TOOL_NAMES)[number];
/**
 * Map from tool name → its Zod input schema. Used by the MCP server's
 * CallTool handler for uniform schema-validation before dispatch.
 */
export declare const TOOL_INPUT_SCHEMAS: Record<ToolName, z.ZodTypeAny>;
//# sourceMappingURL=tools.d.ts.map