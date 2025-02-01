import React from "react";
import { FlatList, Text } from "react-native";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import ProfileItem from "@/components/ui/ProfileItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useGetCurrentUserInfo } from "@/hooks/useGetCurrentUserInfo";
import * as Updates from "expo-updates";
const Profile = () => {
  const { data: userInfo } = useGetCurrentUserInfo();
  const userDetails = userInfo?.data?.data?.user;
  console.log({ userDetails });

  const handleLogout = async () => {
    try {
      // Remove token and userId from AsyncStorage
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
      await Updates.reloadAsync();
      // Navigate to login screen
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const profileItems = [
    { label: "Phone No", value: userDetails?.phoneNumber },
    { label: "Gender", value: "Male" },
    { label: "Change Password", isAction: true },
    { label: "Edit Profile", isAction: true },
    { label: "Logout", isAction: true, action: handleLogout },
  ];

  return (
    <Box className="flex flex-col justify-evenly">
      <Box className="p-4">
        <Box className="p-5 rounded-lg flex items-center">
          <Avatar className="h-[120px] w-[120px]">
            <AvatarImage
              source={{
                uri: userDetails?.image,
              }}
            />
          </Avatar>
        </Box>
        <Text className="text-[32px] text-center">{userDetails?.name}</Text>
        <Text className="text-lg text-gray-300 text-center">
          {userDetails?.email}
        </Text>
      </Box>

      <Box className="mt-4 p-4">
        <FlatList
          data={profileItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ProfileItem item={item} />}
        />
      </Box>
    </Box>
  );
};

export default Profile;
