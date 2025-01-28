import axios from "axios";

const BASE_URL = "https://6651-103-181-227-55.ngrok-free.app";
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
