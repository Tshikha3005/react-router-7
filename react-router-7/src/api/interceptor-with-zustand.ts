import axios from "axios";
import { api } from "./client";
import { useAuthStore } from "../store/auth-store";

let isRefreshing = false;
const queue: any[] = [];

const processQueue = (error: any, token: string | null) => {
  queue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
};

// Request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      const { refreshToken, setTokens } = useAuthStore.getState();
      if (!refreshToken) {
        //logout
        window.location.href = "/";
        return Promise.reject(error);
      }
      if (isRefreshing) {
        return new Promise((res, rej) => {
          queue.push({ res, rej });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post("http://localhost:8000/auth/refresh", {
          refreshToken,
        });
        const newAccess = res.data.accessToken;
        setTokens(newAccess, refreshToken);
        processQueue(null, newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        //logout
        window.location.href = "/";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
