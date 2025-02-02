import { api } from "../axiosConfig";

const getAllProduct = async () => {
  try {
    const response = await api.get(`/product`);
    return response;
  } catch (error) {
    throw error;
  }
};
const getProductById = async (productId: number) => {
  try {
    const response = await api.get(`/product/${productId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

const addProduct = async (payload: FormData) => {
  try {
    const response = await api.post(`/product`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const productService = {
  getAllProduct,
  getProductById,
  addProduct,
};
