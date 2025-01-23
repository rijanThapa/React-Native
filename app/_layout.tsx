// app/_layout.tsx

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack, Tabs } from "expo-router";
import "@/global.css";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "@/store/store";
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
          </Tabs>
        </QueryClientProvider>
      </GluestackUIProvider>
    </Provider>
  );
};

export default Layout;
