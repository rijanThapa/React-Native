import axios from "axios";

const BASE_URL =
  "https://e689-2400-1a00-b060-e8df-88b5-2937-cd3f-934.ngrok-free.app";
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
