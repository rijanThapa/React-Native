import React, { useContext } from "react";
import { FlatList, View } from "react-native";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useQuery } from "react-query";
import { cartService } from "@/api/service/cart";
import CartItem from "@/components/CartItem";

const CartScreen = () => {
  const userId = Number(1);
  const { data: cartResponse } = useQuery(["cart", userId], () =>
    cartService.getAddToCartItem(Number(userId))
  );

  const cart = cartResponse?.data?.cartItems;
  console.log("aaaa", cart);
  if (cart?.length === 0) {
    return (
      <Box className="flex-1 jusify-center item-center p-4">
        <Text className="text-lg">Your cart is empty</Text>
      </Box>
    );
  }
  return (
    <FlatList
      data={cart}
      keyExtractor={(item) => item?.id}
      renderItem={({ item }) => (
        <CartItem
          key={item.id}
          id={item.id}
          imageUrl={item?.product?.image}
          name={item?.product?.name}
          price={item?.product?.price}
          quantity={item.quantity}
        />
      )}
    />
  );
};

export default CartScreen;
