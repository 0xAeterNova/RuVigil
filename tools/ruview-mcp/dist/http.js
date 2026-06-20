/**
 * Lightweight HTTP client for the RuVigil sensing-server.
 *
 * Uses Node's built-in `fetch` (available since Node 18).  All requests respect
 * the optional RUVIEW_API_TOKEN bearer header and a 10-second hard timeout.
 *
 * Failure model: every public function returns a typed `Result<T>` tuple to
 * avoid try/catch proliferation in callers.
 */
const REQUEST_TIMEOUT_MS = 10_000;
export function ok(data) {
    return { ok: true, data };
}
export function err(error) {
    return { ok: false, error };
}
/**
 * Perform an authenticated GET against the sensing-server.
 */
export async function sensingGet(baseUrl, path, token) {
    const url = `${baseUrl.replace(/\/$/, "")}${path}`;
    const headers = {
        Accept: "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
        const res = await fetch(url, {
            headers,
            signal: controller.signal,
        });
        clearTimeout(timer);
        if (!res.ok) {
            return err(`HTTP ${res.status} from ${url}: ${await res.text().catch(() => "(no body)")}`);
        }
        let body;
        try {
            body = await res.json();
        }
        catch {
            return err(`Non-JSON response from ${url}`);
        }
        return ok(body);
    }
    catch (e) {
        clearTimeout(timer);
        if (e instanceof Error && e.name === "AbortError") {
            return err(`Request to ${url} timed out after ${REQUEST_TIMEOUT_MS} ms`);
        }
        return err(`Network error fetching ${url}: ${String(e)}`);
    }
}
//# sourceMappingURL=http.js.map