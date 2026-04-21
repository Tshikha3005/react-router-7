import axios from "axios";
import { api } from "./client";

// Request Interceptor
let accessToken = "";

export const setToken = (token: string) => {
  accessToken = token;
};

api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor | Points we will consider
// Race conditions
// Multiple API calls
// Token sync
// Retry loops
let isRefreshing = false;
let queue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  queue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  queue = [];
};

api.interceptors.response.use(
  (response) => response,

  //   This runs when:

  // 401 → Unauthorized (token expired)
  // 403 → Forbidden
  // 500 → Server error

  // Access token expires → all APIs start failing with 401
  async (error) => {
    // This stores the API that failed
    const originalRequest = error.config;

    //Only handle auth errors && !originalRequest._retry prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve,
            reject,
          });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // call refresh API
        const res = await axios.post("/auth/refresh", {
          refreshToken: localStorage.getItem("refreshToken"),
        });

        const newToken = res.data.accessToken;

        setToken(newToken);
        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // logout user
        window.location.href = "/";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
