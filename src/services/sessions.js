import api from "./api";

export const listSessions = () => api.get("/sessions");

export const createSession = (payload) => api.post("/sessions", payload);
