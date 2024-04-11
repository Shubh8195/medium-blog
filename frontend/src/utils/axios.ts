import axios from "axios";

const BASE_URL = "https://backend.shubham-qyubi.workers.dev/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
