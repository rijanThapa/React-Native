import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Text } from "react-native";
import { useQuery } from "react-query";
import { cartService } from "@/api/service/cart";
import CartItem from "@/components/CartItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Box } from "@/components/ui/box";

// Fetch userId from AsyncStorage
const getUserId = async () => {
  const storedUserId = await AsyncStorage.getItem("userId");
  return storedUserId ? parseInt(storedUserId) : null;
};

const CartScreen = () => {
  const [userId, setUserId] = useState<number | null>(null);

  // Fetch userId on component mount
  useEffect(() => {
    const initializeUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };

    initializeUserId();
  }, []);

  // Query to fetch cart data
  const {
    data: cartResponse,
    isLoading,
    isError,
    refetch,
  } = useQuery(["cart", userId], () => cartService.getAddToCartItem(userId!), {
    enabled: !!userId, // Fetch cart only if userId is available
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable cache
  });

  // Trigger refetch when screen is focused
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        refetch();
      }
    }, [userId, refetch])
  );

  // Handle loading, error, and empty cart states
  if (userId === null) {
    return <Text>Loading user data...</Text>;
  }

  if (isLoading) {
    return <Text>Loading cart...</Text>;
  }
  console.log("cart");
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

  // Render cart items
  return (
    <FlatList
      data={cartResponse?.data?.cartItems}
      keyExtractor={(item) => item.id.toString()}
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
