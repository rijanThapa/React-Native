import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

const BASE_URL =
  "https://9929-2400-1a00-b060-e8df-2592-c610-f7c0-2d00.ngrok-free.app";

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
