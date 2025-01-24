import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image";

type CartItemProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  imageUrl,
  price,
  quantity,
}) => {
  return (
    <Box className="flex flex-row gap-[30px] items-center p-4 border-b border-gray-200 bg-white">
      <Image
        resizeMode="contain"
        source={{ uri: imageUrl }}
        style={{ width: 50, height: 50, borderRadius: 8 }}
      />
      <Box>
        <Text className="text-lg font-bold">{name}</Text>
        <Text className="text-sm text-red-600">Rs. {price.toFixed(2)}</Text>
        <Box className="flex flex-row items-center gap-2 mt-2">
          <Button className="px-3  text-lg bg-gray-200 ">
            <ButtonText>-</ButtonText>
          </Button>
          <Text className="text-sm">{quantity}</Text>
          <Button className="px-3 text-sm bg-gray-200">
            <ButtonText>+</ButtonText>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
