import axios from "axios";

const BASE_URL =
  "https://48b8-2400-1a00-b060-e8df-f859-6e16-61c7-f72e.ngrok-free.app";
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
