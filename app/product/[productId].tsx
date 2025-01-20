import { Text } from "@/components/ui/text";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";

const ProductDetails = () => {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  console.log("Product ID:", productId);

  return (
    <>
      <Text>Product ID: {productId}</Text>
    </>
  );
};

export default ProductDetails;
