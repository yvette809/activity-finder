import { apiFetch } from "./client";

/** @param {{email: string, password: string}} credentials */
export const login = (credentials) =>
  apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

/** @param {Record<string, any>} data */
export const register = (data) =>
  apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
