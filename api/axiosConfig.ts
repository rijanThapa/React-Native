import axios from "axios";

const BASE_URL =
  "https://bbf6-2400-1a00-b060-e8df-f1d9-cf5c-ce1-4dec.ngrok-free.app";
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
