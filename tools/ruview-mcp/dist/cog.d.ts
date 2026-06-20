/**
 * Subprocess wrapper for Cognitum Cog binaries.
 *
 * The cog binaries implement the ADR-100 runtime contract:
 *   cog-<id> version
 *   cog-<id> manifest
 *   cog-<id> health
 *   cog-<id> run --config <path>
 *
 * This module shells out to those binaries.  If the binary is absent or returns
 * a non-zero exit code, the call fails-open with a WARN-level structured error
 * (same pattern cog-pose-estimation uses for missing model weights).
 */
import type { Result } from "./http.js";
/**
 * Run a cog binary with the given subcommand arguments.
 * Returns stdout as a string on success, or an error message.
 */
export declare function runCog(binary: string, args: string[]): Promise<Result<string>>;
/**
 * Call `cog-<id> health` and return the exit code + output.
 */
export declare function cogHealth(binary: string): Promise<Result<string>>;
/**
 * Call `cog-<id> version` and return the version string.
 */
export declare function cogVersion(binary: string): Promise<Result<string>>;
/**
 * Run a cog inference with a synthetic CSI window piped via a temp config.
 *
 * The ADR-100 contract doesn't define a single-shot "infer" subcommand — the
 * cog's `run` subcommand is long-running.  Instead, we:
 * 1. Verify health returns 0.
 * 2. Emit a WARN explaining that single-shot inference requires a live
 *    sensing-server connection, then return a stub result.
 *
 * Full single-shot inference (M2 milestone) will use the sensing-server's
 * `/api/v1/sensing/latest` to build a real CSI window and feed it through the
 * cog via a short-lived `run` session.
 */
export declare function cogInferStub(binary: string, taskLabel: string): Promise<Result<{
    backend: string;
    latency_ms: number;
    stub: true;
}>>;
//# sourceMappingURL=cog.d.ts.map