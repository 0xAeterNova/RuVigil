/**
 * Lightweight HTTP client for the RuVigil sensing-server.
 *
 * Uses Node's built-in `fetch` (available since Node 18).  All requests respect
 * the optional RUVIEW_API_TOKEN bearer header and a 10-second hard timeout.
 *
 * Failure model: every public function returns a typed `Result<T>` tuple to
 * avoid try/catch proliferation in callers.
 */
export type Ok<T> = {
    ok: true;
    data: T;
};
export type Err = {
    ok: false;
    error: string;
};
export type Result<T> = Ok<T> | Err;
export declare function ok<T>(data: T): Ok<T>;
export declare function err(error: string): Err;
/**
 * Perform an authenticated GET against the sensing-server.
 */
export declare function sensingGet<T>(baseUrl: string, path: string, token: string | undefined): Promise<Result<T>>;
//# sourceMappingURL=http.d.ts.map