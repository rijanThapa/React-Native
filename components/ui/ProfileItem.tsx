// ProfileItem.tsx

import React from "react";
import { Text, View } from "react-native";
import { Card } from "./card"; 
import { Box } from "./box";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ProfileItemProps {
  item: {
    label: string;
    value?: string;
    isAction?: boolean;
  };
}

const ProfileItem: React.FC<ProfileItemProps> = ({ item }) => {
  console.log("profile", item);
  return (
    <Card className="border-b border-gray-200">
      <Box className="flex flex-row justify-between p-1 ">
        <Text>{item.label}</Text>
        {item.isAction ? (
          <MaterialIcons name="arrow-forward-ios" size={18} />
        ) : (
          <Text className="text-gray-300">{item.value}</Text>
        )}
      </Box>
    </Card>
  );
};

export default ProfileItem;
