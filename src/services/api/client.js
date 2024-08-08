import axios from "axios";
import { postToken } from "./auth";

const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

client.interceptors.request.use(
  async config => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error(e);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // 만약 accessToken이 만료되었다면
    if (
      error.response.status === 401 &&
      error.response.data.errorCode === "EXPIRED_ACCESS_TOKEN" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await postToken();

        // 새로운 토큰으로 Authorization 헤더를 업데이트하고 원래 요청을 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return client(originalRequest);
      } catch (tokenError) {
        console.error("토큰 재발급 실패", tokenError);
        return Promise.reject(tokenError);
      }
    }

    return Promise.reject(error);
  },
);

export default client;
