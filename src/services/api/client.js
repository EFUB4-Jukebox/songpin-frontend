import axios from "axios";
import { postToken } from "./auth";

const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

client.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return error.response;
  },
);

client.interceptors.request.use(
  async config => {
    try {
      let token = localStorage.getItem("accessToken");
      if (!token) {
        token = await postToken();
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("request interceotor 에러: ", e);
      return Promise.reject(e);
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default client;
