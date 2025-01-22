import { productSerive } from "@/api/service/product";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useQuery } from "react-query";

const ProductDetails = () => {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery(["productId", productId], () =>
    productSerive.getProductById(Number(productId))
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const productDetails = product?.data?.data;

  const imageSource = productDetails?.image
    ? { uri: productDetails.image }
    : "";

  return (
    <Box className="flex-1 item-centre p-8">
      <Stack.Screen options={{ title: productDetails?.name }} />

      <Card className="p-5 rounded-lg max-w-[360px] m-3">
        <Image
          source={imageSource}
          resizeMode="contain"
          className="mb-6 h-[240px] w-full rounded-md"
        />

        <Text className="text-sm font-normal mb-2 text-typography-700">
          {productDetails?.name}
        </Text>
        <VStack className="mb-6">
          <Heading size="md" className="mb-4">
            {productDetails?.price}
          </Heading>
          <Text size="sm">{productDetails?.description}</Text>
        </VStack>
        <Box className="flex-col sm:flex-row">
          <Button
            className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
            // onPress={handleAddToCart}
          >
            <ButtonText size="sm">Add to cart</ButtonText>
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 border-outline-300 sm:flex-1"
          >
            <ButtonText size="sm" className="text-typography-600">
              Wishlist
            </ButtonText>
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ProductDetails;
