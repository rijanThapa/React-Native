import axios from "axios";

const BASE_URL =
  "https://63f6-2400-1a00-b060-e8df-7c61-d07e-ddb2-7864.ngrok-free.app";
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
