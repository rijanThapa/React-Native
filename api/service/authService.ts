// authService.tsx
import { api } from "../axiosConfig";

export const login = async (data: any) => {
  try {
    const response = await api.post("/auth/login", data);
    return response; // Return the entire Axios response object
  } catch (error) {
    throw new Error("Login failed."); // Handle errors appropriately
  }
};
