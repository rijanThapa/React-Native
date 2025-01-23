import { cartService } from "@/api/service/cart";
import { productService } from "@/api/service/product";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

const ProductDetails = () => {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const [token, setToken] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUserId = await AsyncStorage.getItem("userId");

      setToken(storedToken);
      setUserId(storedUserId ? parseInt(storedUserId) : null);

      if (!storedToken) {
        router.replace("/login");
      }
    };

    fetchData();
  }, [router]);

  const { data: product, isLoading } = useQuery(["productId", productId], () =>
    productService.getProductById(Number(productId))
  );

  const mutation = useMutation(
    (data: any) => cartService.addToCart(Number(userId), data),
    {
      onSuccess: () => {
        console.log("Product added to cart successfully!");
      },
      onError: (error) => {
        console.error("Error adding product to cart:", error);
      },
    }
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const productDetails = product?.data?.data;

  const imageSource = productDetails?.image
    ? { uri: productDetails.image }
    : "";

  const handleAddToCart = () => {
    if (userId) {
      const payload = {
        productId: productDetails?.id,
      };
      mutation.mutate(payload);
    } else {
      console.log("User not authenticated");
    }
  };
  console.log({ token });
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
            onPress={handleAddToCart}
          >
            <ButtonText size="sm">Add to cart</ButtonText>
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ProductDetails;
