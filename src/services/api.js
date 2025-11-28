import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:6868";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUserProfile = async () => {
  try{
    const response = await api.get("/api/students");
    console.log("User profile data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
export const AuthLogin = async (username, password, role) => {
  try {
    if (role === 'admin') {
      const response = await api.post("/api/login/admin", { username, password });
      return response.data;
    }else if (role === 'student') {
      const response = await api.post("/api/login/student", { username, password });
      return response.data;
    }
    else if (role === 'teacher') {
      const response = await api.post("/api/login/teacher", { username, password });
      return response.data; 
    }
    else if (role === 'tutor') {
      const response = await api.post("/api/login/tutor", { username, password });
      return response.data;
    }

  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export default api;
