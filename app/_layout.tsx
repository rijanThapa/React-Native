// app/_layout.tsx

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack, Tabs } from "expo-router";
import "@/global.css";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "@/store/store";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
const queryClient = new QueryClient();
const Layout = () => {
  return (
    <Provider store={store}>
      <GluestackUIProvider>
        <QueryClientProvider client={queryClient}>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: "blue",
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarIcon: ({ color }) => (
                  <MaterialIcons name="home" size={24} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="cart"
              options={{
                title: "Cart",
                tabBarIcon: ({ color }) => (
                  <MaterialIcons name="shopping-cart" size={24} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="+not-found"
              options={{
                tabBarButton: () => null,
                headerShown: false,
              }}
            />
            <Tabs.Screen
              name="login"
              options={{
                tabBarStyle: { display: "none" },
                tabBarButton: () => null,
                headerShown: false,
              }}
            />

            <Tabs.Screen
              name="product/[productId]"
              options={{
                tabBarButton: () => null,
                headerShown: false,
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: "Profile",
                tabBarIcon: ({ color }) => (
                  <Avatar className="w-[20px] h-[20px]">
                    <AvatarImage
                      source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                      height={20}
                      width={20}
                    />
                  </Avatar>
                ),
              }}
            />
          </Tabs>
        </QueryClientProvider>
      </GluestackUIProvider>
    </Provider>
  );
};

export default Layout;
