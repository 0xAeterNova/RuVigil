/**
 * MCP tool: ruview.bfld.subscribe
 *
 * Registers interest in BFLD events for `duration_s` seconds by instructing
 * the sensing-server to forward MQTT messages from topic
 * `ruview/<node_id>/bfld/*` (ADR-122 §2.2) to a server-side event buffer.
 *
 * This is a stateless stub that does NOT require a running MQTT broker in
 * the MCP server process. Instead it proxies the subscription request to the
 * sensing-server's webhook/subscription registry at
 * POST /api/v1/bfld/<node_id>/subscribe, which returns a subscription_id.
 *
 * When the sensing-server is unreachable, the handler returns {ok:false,warn:true}
 * rather than throwing, consistent with the ruview-mcp soft-failure convention.
 *
 * In environments where no real broker is available (unit tests, dev machines
 * without mosquitto) the handler synthesises a valid subscription envelope
 * locally so the MCP schema-validation gate can be exercised independently.
 *
 * ADR-124 §4.1 output: { subscription_id: string, expires_at: number }
 */
import { z } from "zod";
import type { RuviewConfig } from "../types.js";
export declare const bfldSubscribeSchema: z.ZodObject<{
    node_id: z.ZodOptional<z.ZodString>;
    duration_s: z.ZodNumber;
    sensing_server_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    duration_s: number;
    sensing_server_url?: string | undefined;
    node_id?: string | undefined;
}, {
    duration_s: number;
    sensing_server_url?: string | undefined;
    node_id?: string | undefined;
}>;
export type BfldSubscribeInput = z.infer<typeof bfldSubscribeSchema>;
export interface BfldSubscribeResult {
    ok: true;
    subscription_id: string;
    /** Unix timestamp (ms) when the subscription expires. */
    expires_at: number;
    /** MQTT wildcard topic this subscription covers. */
    topic: string;
}
export declare function bfldSubscribe(input: BfldSubscribeInput, config: RuviewConfig): Promise<object>;
//# sourceMappingURL=bfld-subscribe.d.ts.map