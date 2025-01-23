import { cartService } from "@/api/service/cart";
import { productSerive } from "@/api/service/product";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

const ProductDetails = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isUserIdFetched, setIsUserIdFetched] = useState(false); // Track when userId is fetched

  // Fetch user ID from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          console.log("No userId found");
        }
      } catch (error) {
        console.error("Error retrieving userId", error);
      } finally {
        setIsUserIdFetched(true); // Set to true once the userId fetch is complete
      }
    };

    fetchUserId();
  }, []);

  // Ensure `userId` is fetched before attempting to make any requests
  if (!isUserIdFetched) {
    return <Text>Loading user data...</Text>; // Render a loading state until userId is fetched
  }

  // Get product ID from route params
  const { productId } = useLocalSearchParams<{ productId: string }>();

  // Fetch product details using React Query
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery(["productId", productId], () =>
    productSerive.getProductById(Number(productId))
  );

  if (isLoading) {
    return <Text>Loading product...</Text>;
  }

  const productDetails = product?.data?.data;

  const imageSource = productDetails?.image
    ? { uri: productDetails.image }
    : "";

  // Add to cart mutation
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

  return (
    <Box className="flex-1 item-center p-8">
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
            ${productDetails?.price}
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
          <Button
            variant="outline"
            className="px-4 py-2 border-outline-300 sm:flex-1"
            // Add functionality for wishlist if needed
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
