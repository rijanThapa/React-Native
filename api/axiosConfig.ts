import axios from "axios";

const BASE_URL = "https://c0a6-38-255-151-34.ngrok-free.app";
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
