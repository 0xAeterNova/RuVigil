/**
 * MCP tool: ruview.bfld.last_scan
 *
 * Returns the most recent BFLD scan result for a node, sourced from the
 * sensing-server's REST proxy of the BFLD MQTT state topics defined in
 * ADR-122 §2.2. The sensing-server aggregates the per-entity state topics
 * (presence, person_count, confidence, identity_risk) into a single JSON
 * object at GET /api/v1/bfld/<node_id>/last_scan.
 *
 * Wire format (ADR-118 BfldEvent, class-permissive fields only):
 *   node_id              string   — originating node
 *   identity_risk_score  number   — [0,1], None at privacy_class Restricted
 *   privacy_class        number   — 0=raw,1=derived,2=anonymous,3=restricted
 *   n_frames             number   — person_count proxy (frames accumulated)
 *   timestamp_ms         number   — capture timestamp in ms since epoch
 *
 * Returns {ok:false, warn:true} when the sensing-server is not reachable
 * so the caller can treat unavailability as a soft warning rather than
 * a hard error (mirrors the pattern in csi-latest.ts).
 */
import { z } from "zod";
import type { RuviewConfig } from "../types.js";
export declare const bfldLastScanSchema: z.ZodObject<{
    node_id: z.ZodOptional<z.ZodString>;
    sensing_server_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    sensing_server_url?: string | undefined;
    node_id?: string | undefined;
}, {
    sensing_server_url?: string | undefined;
    node_id?: string | undefined;
}>;
export type BfldLastScanInput = z.infer<typeof bfldLastScanSchema>;
/** ADR-124 §4.1 output contract for ruview.bfld.last_scan. */
export interface BfldLastScanResult {
    ok: true;
    node_id: string;
    identity_risk_score: number | null;
    privacy_class: number;
    /** person_count used as n_frames proxy (ADR-118 BfldEvent.person_count). */
    n_frames: number;
    /** Converted from BfldEvent.timestamp_ns (nanoseconds → milliseconds). */
    timestamp_ms: number;
}
export declare function bfldLastScan(input: BfldLastScanInput, config: RuviewConfig): Promise<object>;
//# sourceMappingURL=bfld-last-scan.d.ts.map