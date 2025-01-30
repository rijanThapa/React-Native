import axios from "axios";

const BASE_URL =
  "https://800c-2400-1a00-b060-e8df-ecc6-bb62-40a1-efee.ngrok-free.app";
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
