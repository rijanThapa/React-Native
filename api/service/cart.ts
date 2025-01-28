import { api } from "../axiosConfig";

const addToCart = async (userId: number, payload: number) => {
  try {
    const response = await api.post(`/cart-item/${userId}/add`, payload);
    return response;
  } catch (error) {
    throw error;
  }
};
const getAddToCartItem = async (userId: number) => {
  try {
    const response = await api.get(`/cart-item/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
const incrementCartItem = async (cartId: number) => {
  console.log(cartId);
  try {
    const response = await api.patch(`/cart-item/increment/${cartId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
const decrementCartItem = async (cartId: number) => {
  console.log(cartId);
  try {
    const response = await api.patch(`/cart-item/decrement/${cartId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const cartService = {
  addToCart,
  getAddToCartItem,
  incrementCartItem,
  decrementCartItem,
};
