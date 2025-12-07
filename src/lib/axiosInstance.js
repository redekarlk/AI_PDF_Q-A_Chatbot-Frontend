import axios from "axios";

const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://ai-pdf-q-a-chatbot-backend-o723.onrender.com",
});

// attach token automatically
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      // ensure headers object exists
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});



api.interceptors.response.use(
  (res) => res,
  (err) => {
    const resp = err?.response;
    // Prefer structured logging so empty objects are still useful
    if (resp) {
      try {
        console.error("API Error →", {
          status: resp.status,
          statusText: resp.statusText,
          url: resp.config?.url,
          data: resp.data,
        });
      } catch (e) {
        console.error("API Error →", resp);
      }
    } else if (err?.message) {
      console.error("API Error →", err.message, err.code ? { code: err.code } : undefined);
    } else {
      // fallback to logging the whole error (useful for network errors)
      console.error("API Error →", err);
    }

    return Promise.reject(err);
  }
);


export default api;
