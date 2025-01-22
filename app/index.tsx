// app/index.tsx

import React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";

import ProductListItem from "@/components/ProductItem";
import { useQuery } from "react-query";
import { productSerive } from "@/api/service/product";
const Home = () => {
  const router = useRouter();
  const { data: products } = useQuery(["product"], () =>
    productSerive.getAllProduct()
  );

  const productList = products?.data?.data;
  return (
    <View>
      <FlatList
        data={productList}
        numColumns={2}
        contentContainerClassName="gap-2"
        columnWrapperClassName="gap-2"
        renderItem={({ item }: any) => <ProductListItem product={item} />}
      />
    </View>
  );
};

export default Home;
