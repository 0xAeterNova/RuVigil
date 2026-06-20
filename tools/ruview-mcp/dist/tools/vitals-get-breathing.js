/**
 * MCP tool: ruview.vitals.get_breathing (ADR-124 §4.1)
 * Output: { ok, node_id, breathing_rate_bpm | null, confidence, timestamp_ms }
 */
import { z } from "zod";
import { fetchVitals, resolveNodeId } from "./vitals-fetch.js";
export const vitalsGetBreathingSchema = z.object({
    node_id: z.string().min(1).optional().describe("Target node id."),
    window_s: z.number().positive().max(300).optional().describe("Averaging window (s, max 300)."),
    sensing_server_url: z.string().url().optional(),
});
export async function vitalsGetBreathing(input, config) {
    const nodeId = resolveNodeId(input.node_id);
    const baseUrl = input.sensing_server_url ?? config.sensingServerUrl;
    const r = await fetchVitals(nodeId, baseUrl, config.apiToken);
    if (!r.ok)
        return r;
    return {
        ok: true,
        node_id: r.data.node_id,
        breathing_rate_bpm: r.data.breathing_rate_bpm,
        confidence: r.data.confidence,
        timestamp_ms: r.data.timestamp_ms,
    };
}
//# sourceMappingURL=vitals-get-breathing.js.map