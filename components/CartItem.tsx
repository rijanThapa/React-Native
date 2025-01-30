import React, { useEffect, useState } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { useMutation, useQueryClient } from "react-query";
import { cartService } from "@/api/service/cart";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type CartItemProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  totalQuantity: number;
  userId: number;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  imageUrl,
  price,
  quantity,
  totalQuantity,
  userId,
}) => {
  const queryClient = useQueryClient();
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  useEffect(() => {
    setItemQuantity(quantity);
  }, [quantity]);
  const { mutate } = useMutation(
    (id: string) => cartService.incrementCartItem(Number(id)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cart");
      },
      onError: (error) => {
        console.error("Error incrementing item:", error);
        alert("Failed to add product");
      },
    }
  );
  const { mutate: decrement } = useMutation(
    (id: string) => cartService.decrementCartItem(Number(id)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cart");
      },
      onError: (error) => {
        console.error("Error decrementing item:", error);
        alert("Failed to remove product");
      },
    }
  );

  const { mutate: removeItem } = useMutation(
    (id: string) => cartService.removeCartItem(userId, Number(id)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cart");
      },
      onError: (error) => {
        console.error("Error removing item:", error);
        alert("Failed to remove product");
      },
    }
  );

  // Handle increment function
  const handleIncrement = () => {
    if (itemQuantity < totalQuantity) {
      setItemQuantity(itemQuantity + 1);
      mutate(id);
      setIsOutOfStock(false);
    } else {
      setIsOutOfStock(true);
    }
  };

  const handleDecrement = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
      decrement(id);
      setIsOutOfStock(false);
    }
  };

  const handleRemove = () => {
    removeItem(id);
  };

  return (
    <Box className="flex flex-row gap-[30px] items-center p-4 border-b border-gray-200 bg-white w-[100%]">
      <Image
        resizeMode="contain"
        source={{ uri: imageUrl }}
        style={{ width: 50, height: 50, borderRadius: 8 }}
      />
      <Box className="flex-1">
        <Text className="text-lg font-bold">{name}</Text>
        <Text className="text-sm text-red-400">Rs. {price.toFixed(2)}</Text>
        <Box className="flex flex-row mt-2 justify-between">
          <Box className="flex flex-row items-center gap-2 ">
            <Button
              className="px-3 text-lg bg-gray-200"
              onPress={handleDecrement}
              disabled={itemQuantity <= 1}
            >
              <ButtonText className="text-black">-</ButtonText>
            </Button>
            <Text className="text-sm">{itemQuantity}</Text>
            <Button
              className="px-3 text-sm bg-gray-200"
              onPress={handleIncrement}
            >
              <ButtonText className="text-black">+</ButtonText>
            </Button>
          </Box>
          <Button className="px-3 text-lg bg-white" onPress={handleRemove}>
            <MaterialIcons name="delete-outline" size={24} color="red" />
          </Button>
        </Box>
        {isOutOfStock && (
          <Text className="text-sm text-red-500 mt-2">Out of Stock</Text>
        )}
      </Box>
    </Box>
  );
};

export default CartItem;
