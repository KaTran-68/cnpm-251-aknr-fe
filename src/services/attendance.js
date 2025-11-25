import api from "./api";

export const confirmAttendance = (sessionId, payload) =>
  api.post(`/sessions/${sessionId}/attendance/confirm`, payload);
