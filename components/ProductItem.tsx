import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { Image } from "./ui/image";
import { Card } from "./ui/card";
import { Text } from "./ui/text";
import { Heading } from "./ui/heading";
import { VStack } from "./ui/vstack";

export default function ProductListItem({ product }: any) {
  const router = useRouter(); // This should be directly inside the function

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <Pressable className="flex-1" onPress={handlePress}>
      <Card className=" rounded-lg max-w-[300px] h-auto flex-1">
        <Image
          source={{
            uri: product.image,
          }}
          className="mb-6 h-[150px] w-full rounded-md object-cover"
          alt={product.name}
          resizeMode="contain"
        />
        <Text className="text-sm font-normal mb-2 text-typography-700">
          {product.name}
        </Text>
        <VStack className="">
          <Heading size="md" className="">
            {product.price}
          </Heading>
        </VStack>
      </Card>
    </Pressable>
  );
}
