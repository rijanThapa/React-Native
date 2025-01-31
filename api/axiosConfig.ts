import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL =
  "https://15aa-2400-1a00-b060-e8df-d0a7-2557-aaa3-a971.ngrok-free.app";

const getTokenFromStorage = async () => {
  return await AsyncStorage.getItem("token");
};

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await getTokenFromStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
