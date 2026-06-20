/**
 * Shared helper: fetch EdgeVitalsMessage from the sensing-server.
 *
 * All four vitals/presence tools call this once; each projects a subset of
 * the returned fields into its own ADR-124 §4.1 output shape.
 *
 * Endpoint: GET /api/v1/vitals/<node_id>/latest
 * Returns: EdgeVitalsMessage | {ok:false, warn:true, error, hint}
 */
import type { EdgeVitalsMessage } from "../types.js";
export type VitalsFetchOk = {
    ok: true;
    data: EdgeVitalsMessage;
};
export type VitalsFetchErr = {
    ok: false;
    warn: true;
    error: string;
    hint: string;
};
export type VitalsFetchResult = VitalsFetchOk | VitalsFetchErr;
export declare function fetchVitals(nodeId: string, baseUrl: string, token: string | undefined): Promise<VitalsFetchResult>;
/** Resolve node id: use supplied value or fall back to "default". */
export declare function resolveNodeId(nodeId: string | undefined): string;
//# sourceMappingURL=vitals-fetch.d.ts.map