import { api } from "../axiosConfig";
const getCurrentUserInfo = async () => {
  try {
    const response = await api.get(`/api/currentUser`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const userService = {
  getCurrentUserInfo,
};
