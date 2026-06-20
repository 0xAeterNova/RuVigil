/**
 * MCP tool: ruview_registry_list
 *
 * List installed/available cogs from the Cognitum edge module registry.
 *
 * Fetches `/api/v1/edge/registry` from the sensing-server, which proxies the
 * canonical GCS catalog with a 1-hour TTL cache (ADR-102).  The result is the
 * full 105-cog catalog as of the last upstream sync.
 *
 * Use the optional `category` filter to narrow results.  Available categories
 * (from the v2.1.0 registry): health, security, building, retail, industrial,
 * research, ai, swarm, signal, network, developer.
 */
import { z } from "zod";
import type { RuviewConfig } from "../types.js";
export declare const registryListSchema: z.ZodObject<{
    /** Filter cogs by category. */
    category: z.ZodOptional<z.ZodString>;
    /** Filter cogs whose id or name contains this substring (case-insensitive). */
    search: z.ZodOptional<z.ZodString>;
    /** Force-bypass the sensing-server's 1-hour cache. */
    refresh: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    /** Override the sensing-server URL for this call only. */
    sensing_server_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    refresh: boolean;
    sensing_server_url?: string | undefined;
    category?: string | undefined;
    search?: string | undefined;
}, {
    sensing_server_url?: string | undefined;
    category?: string | undefined;
    search?: string | undefined;
    refresh?: boolean | undefined;
}>;
export type RegistryListInput = z.infer<typeof registryListSchema>;
export declare function registryList(input: RegistryListInput, config: RuviewConfig): Promise<object>;
//# sourceMappingURL=registry-list.d.ts.map