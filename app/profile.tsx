import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import ProfileItem from "@/components/ui/ProfileItem";
import { useGetCurrentUserInfo } from "@/hooks/useGetCurrentUserInfo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { FlatList, Text, View } from "react-native";

const Profile = () => {
  const { data: userInfo } = useGetCurrentUserInfo();
  const userDetails = userInfo?.data?.data?.user;
  const profileItems = [
    { label: "Phone No", value: userDetails?.phoneNumber },
    { label: "Gender", value: "Male" },
    { label: "Change Password", isAction: true },
    { label: "Edit Profile", isAction: true },
    { label: "Logout", isAction: true },
  ];
  return (
    <Box className="flex flex-col justify-evenly">
      <Box className=" p-4 ">
        <Box className="p-5 rounded-lg flex items-center ">
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
          keyExtractor={(index) => index.toString()}
          renderItem={({ item }) => <ProfileItem item={item} />}
        />
      </Box>
    </Box>
  );
};

export default Profile;
