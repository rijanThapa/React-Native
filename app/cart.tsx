import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Text } from "react-native";
import { useQuery } from "react-query";
import { cartService } from "@/api/service/cart";
import CartItem from "@/components/CartItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";

// Fetch userId from AsyncStorage
const getUserId = async () => {
  const storedUserId = await AsyncStorage.getItem("userId");
  return storedUserId ? parseInt(storedUserId) : null;
};

const CartScreen = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const initializeUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };

    initializeUserId();
  }, []);

  const {
    data: cartResponse,
    isLoading,
    isError,
    refetch,
  } = useQuery(["cart", userId], () => cartService.getAddToCartItem(userId!), {
    enabled: !!userId,
    staleTime: 0,
    cacheTime: 0,
  });

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        refetch();
      }
    }, [userId, refetch])
  );

  if (userId === null) {
    return <Text>Loading user data...</Text>;
  }

  if (isLoading) {
    return <Text>Loading cart...</Text>;
  }

  if (isError) {
    return (
      <Box className="flex-1 justify-center items-center p-4">
        <Text className="text-lg">Failed to load cart. Please try again.</Text>
      </Box>
    );
  }

  // Display empty cart message if no items are found
  if (cartResponse?.data?.cartItems?.length === 0) {
    return (
      <Box className="flex-1 justify-center items-center p-4">
        <Text className="text-lg">Your cart is empty</Text>
      </Box>
    );
  }

  const totalPrice: any = cartResponse.data.cartItems.reduce(
    (total: any, item: any) => {
      return total + item.product.price * item.quantity;
    },
    0
  );

  return (
    <>
      <FlatList
        data={cartResponse?.data?.cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            key={item.id}
            userId={userId}
            id={item.id}
            imageUrl={item?.product?.image}
            name={item?.product?.name}
            price={item?.product?.price}
            quantity={item.quantity}
            totalQuantity={item.product?.quantity}
          />
        )}
      />
      <Box className="bg-white m-3 p-4 rounded-lg flex flex-row justify-between">
        <>
          <Text className="text-lg">
            Total Price: Rs
            <Text className="text-red-300"> {totalPrice.toFixed(2)}</Text>
          </Text>
        </>
        <Text>Buy now</Text>
      </Box>
    </>
  );
};

export default CartScreen;
