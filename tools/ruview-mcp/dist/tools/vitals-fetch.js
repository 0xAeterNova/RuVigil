/**
 * Shared helper: fetch EdgeVitalsMessage from the sensing-server.
 *
 * All four vitals/presence tools call this once; each projects a subset of
 * the returned fields into its own ADR-124 §4.1 output shape.
 *
 * Endpoint: GET /api/v1/vitals/<node_id>/latest
 * Returns: EdgeVitalsMessage | {ok:false, warn:true, error, hint}
 */
import { sensingGet } from "../http.js";
const HINT = "Ensure the sensing-server is running and a node is streaming CSI data. " +
    "Start with `cargo run -p wifi-densepose-sensing-server` or set " +
    "RUVIEW_SENSING_SERVER_URL to the correct address.";
export async function fetchVitals(nodeId, baseUrl, token) {
    const result = await sensingGet(baseUrl, `/api/v1/vitals/${encodeURIComponent(nodeId)}/latest`, token);
    if (!result.ok) {
        return { ok: false, warn: true, error: result.error, hint: HINT };
    }
    const d = result.data;
    if (typeof d.node_id !== "string" || typeof d.timestamp_ms !== "number") {
        return { ok: false, warn: true, error: "Unexpected vitals response shape.", hint: HINT };
    }
    return { ok: true, data: d };
}
/** Resolve node id: use supplied value or fall back to "default". */
export function resolveNodeId(nodeId) {
    return nodeId ?? "default";
}
//# sourceMappingURL=vitals-fetch.js.map