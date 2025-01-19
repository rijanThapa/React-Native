// app/index.tsx

import React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import products from "../assets/product.json";
import ProductListItem from "@/components/ProductItem";
const Home = () => {
  const router = useRouter();

  return (
    <View>
      <FlatList
        data={products}
        numColumns={2}
        contentContainerClassName="gap-2"
        columnWrapperClassName="gap-2"
        renderItem={({ item }: any) => <ProductListItem product={item} />}
      />
    </View>
  );
};

export default Home;
