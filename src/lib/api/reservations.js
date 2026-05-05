import { apiFetch } from "./client";

/** @param {string} userId */
export const getUserReservations = (userId) =>
  apiFetch(`/api/reservations/user/${userId}`);

/** @param {string} id */
export const getReservationById = (id) =>
  apiFetch(`/api/reservations/${id}`);

/**
 * @param {string} activityId
 * @param {{ numberOfPersons: number, selectedTimeSlot?: string }} payload
 */
export const createReservation = (activityId, payload) =>
  apiFetch(`/api/activities/${activityId}/reservations`, {
    method: "POST",
    // Note: bookingStatus is intentionally NOT sent from the client.
    // The server should default it to "pending" — letting users pick
    // "confirmed" client-side was a security hole in the old version.
    body: JSON.stringify(payload),
  });

/** @param {string} id */
export const cancelReservation = (id) =>
  apiFetch(`/api/reservations/${id}`, { method: "DELETE" });
