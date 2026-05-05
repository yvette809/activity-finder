import { apiFetch } from "./client";

export const getTrainers = () => apiFetch("/api/trainers");

/** @param {string} id */
export const getTrainer = (id) => apiFetch(`/api/trainers/${id}`);
