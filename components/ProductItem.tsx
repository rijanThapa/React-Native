import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { Image } from "./ui/image";
import { Card } from "./ui/card";
import { Text } from "./ui/text";
import { Heading } from "./ui/heading";
import { VStack } from "./ui/vstack";

export default function ProductListItem({ product }: any) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <Pressable className="flex-1" onPress={handlePress}>
      <Card className="p-5 rounded-lg max-w-[300px] flex-1">
        <Image
          source={{
            uri: product.image,
          }}
          className="mb-6 h-[240px] w-full rounded-md"
          alt={product.name}
          resizeMode="contain"
        />
        <Text className="text-sm font-normal mb-2 text-typography-700">
          {product.name}
        </Text>
        <VStack className="mb-6">
          <Heading size="md" className="mb-4">
            {product.price}
          </Heading>
        </VStack>
      </Card>
    </Pressable>
  );
}
