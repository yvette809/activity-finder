import { apiFetch } from "./client";

/**
 * @typedef {Object} Activity
 * @property {string} _id
 * @property {string} typeOfActivity
 * @property {string} location
 * @property {string} description
 * @property {number} capacity
 * @property {number} price
 * @property {string} activityStatus
 * @property {string} imageSrc
 * @property {string} skillLevel
 * @property {string} ageGroup
 * @property {Array<{_id: string, startTime: string, endTime: string}>} activityTimes
 * @property {{_id: string, firstName: string, lastName: string} | null} creator
 * @property {Array<any>} reservations
 * @property {Array<any>} reviews
 */

/** @returns {Promise<Activity[]>} */
export const getActivities = () => apiFetch("/api/activities");

/** @param {string} id @returns {Promise<Activity>} */
export const getActivity = (id) => apiFetch(`/api/activities/${id}`);

/**
 * @param {Record<string, string>} filters
 * @returns {Promise<Activity[]>}
 */
export const searchActivities = (filters) => {
  // Strip empty values so URL stays clean
  const clean = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== undefined && v !== "")
  );
  const params = new URLSearchParams(clean).toString();
  return apiFetch(`/api/activities/search?${params}`);
};

/** @param {string} id */
export const deleteActivity = (id) =>
  apiFetch(`/api/activities/${id}`, { method: "DELETE" });

/** @param {Partial<Activity>} data */
export const createActivity = (data) =>
  apiFetch("/api/activities", {
    method: "POST",
    body: JSON.stringify(data),
  });

/**
 * @param {string} id
 * @param {Partial<Activity>} data
 */
export const updateActivity = (id, data) =>
  apiFetch(`/api/activities/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
