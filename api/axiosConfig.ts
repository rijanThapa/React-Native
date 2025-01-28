import axios from "axios";

const BASE_URL =
  "https://3dc2-2400-1a00-b060-e8df-d72-b1b9-2c64-c57d.ngrok-free.app";
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
