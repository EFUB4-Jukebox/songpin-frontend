import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
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

client.interceptors.request.use(async config => {
  try {
    const token = localStorage.getItem("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnQGciLCJpYXQiOjE3MjI1MjUzNjIsImV4cCI6MTcyMjYxMTc2Mn0.vuDWqnIHojyFWpFZvJwh74t-cwI5_HUWNfsHueZxhlw");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    return null;
  }

  return config;
});

export default client;
