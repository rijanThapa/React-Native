import axios from "axios";

const BASE_URL =
  "https://843c-2400-1a00-b060-e8df-5df1-26d2-5cfe-8a19.ngrok-free.app";
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
