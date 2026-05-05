/**
 * Base API client.
 *
 * Uses RELATIVE URLs so it works in dev, staging, and production
 * without any environment configuration. The previous version
 * had `http://localhost:3000` hardcoded, which broke every
 * deployment.
 */

/**
 * @template T
 * @param {string} path - API path (e.g. "/api/activities")
 * @param {RequestInit} [init]
 * @returns {Promise<T>}
 */
export async function apiFetch(path, init = {}) {
  const res = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unknown error");
    throw new ApiError(res.status, errorText || `Request failed: ${res.status}`);
  }

  // Handle 204 No Content
  if (res.status === 204) return /** @type {T} */ (null);

  return res.json();
}

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
