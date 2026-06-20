/**
 * Runtime schema validation for sensing-server responses.
 *
 * These validators catch schema drift (when the sensing-server's API
 * changes without updating the MCP layer) and provide actionable errors
 * to the calling agent rather than silently returning malformed data.
 *
 * The schema is pinned to sensing-server schema version 2 per ADR-101
 * frame_subscriber.rs. When the server bumps schema_version, a validation
 * error here is the correct signal to update the MCP types.
 */
export type ValidationResult = {
    valid: true;
} | {
    valid: false;
    errors: string[];
};
/**
 * Validate a CsiWindow conforms to the expected 56×20 shape.
 */
export declare function validateCsiWindow(window: unknown): ValidationResult;
/**
 * Validate a full SensingLatestResponse (schema_version 2, ADR-101).
 */
export declare function validateSensingLatestResponse(data: unknown): ValidationResult;
//# sourceMappingURL=validate.d.ts.map