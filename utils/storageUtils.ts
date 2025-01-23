import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token; // Return the token if it exists
  } catch (error) {
    console.error("Error retrieving token from AsyncStorage:", error);
    return null; // Return null or handle error as per your app's requirement
  }
};
