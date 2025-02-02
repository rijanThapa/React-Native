import React, { useState } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Text,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from "react-native";
import { Box } from "@/components/ui/box";
import * as ImagePicker from "expo-image-picker";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Input, InputField } from "@/components/ui/input";
import { useMutation } from "react-query";
import { productService } from "@/api/service/product";
import { router } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Define your form data type
interface FormData {
  p_name: string;
  price: string;
  desc: string;
  quantity: any;
}

const schema = yup.object().shape({
  p_name: yup.string().required("Product name is required"),
  price: yup.string().required("Price is required"),
  desc: yup.string().required("Product description is required"),
  quantity: yup
    .number()
    .positive("Quantity must be a positive number")
    .required("Quantity is required"),
});

const FormComponent = () => {
  const [image, setImage] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      p_name: "",
      price: "",
      desc: "",
      quantity: "",
    },
  });

  // Function to pick image
  const pickImage = async () => {
    // Request for permission to access the camera roll
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "We need permission to access your media library."
      );
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const { mutate } = useMutation(
    (data: any) => productService.addProduct(data),
    {
      onSuccess: () => {
        router.reload(); // Navigate to the home page or desired route
      },
      onError: () => {
        alert("Error occurred while adding the product.");
      },
    }
  );

  const onPressSend = (data: FormData) => {
    const formData = new FormData();
    formData.append("name", data.p_name);
    formData.append("price", data.price);
    formData.append("description", data.desc);
    formData.append("quantity", data.quantity);

    // Append the image if available
    if (image) {
      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];

      formData.append("image", {
        uri: image,
        type: `image/${fileType}`,
        name: `product-image.${fileType}`,
      });
    }

    mutate(formData); // Send the form data including the image
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView>
        <Box className="m-4">
          <Box className="mb-4">
            <Text>Product Name</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input variant="outline" size="md" className="mt-2">
                  <InputField
                    style={{ height: 50 }}
                    placeholder="Enter the product name"
                    value={value}
                    onChangeText={onChange}
                  />
                </Input>
              )}
              name="p_name"
            />
            {errors.p_name && (
              <Text style={{ color: "red" }}>{errors.p_name.message}</Text>
            )}

            <Text className="mt-2">Price</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input className="mt-2" variant="outline" size="md">
                  <InputField
                    style={{ height: 50 }}
                    placeholder="Enter the product price"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                  />
                </Input>
              )}
              name="price"
            />
            {errors.price && (
              <Text style={{ color: "red" }}>{errors.price.message}</Text>
            )}

            <Text className="mt-2">Description</Text>

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Textarea size="md" style={{ minHeight: 100, paddingTop: 10 }}>
                  <TextareaInput
                    multiline={true}
                    placeholder="Product description"
                    onChangeText={onChange}
                    value={value}
                    style={{
                      textAlignVertical: "top",
                      paddingTop: 0,
                    }}
                  />
                </Textarea>
              )}
              name="desc"
            />
            {errors.desc && (
              <Text style={{ color: "red" }}>{errors.desc.message}</Text>
            )}

            <Text className="mt-2">Quantity</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input className="mt-2" variant="outline" size="md">
                  <InputField
                    style={{ height: 50 }}
                    placeholder="Enter product quantity"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                  />
                </Input>
              )}
              name="quantity"
            />

            {/* Image Picker Section */}
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* Dotted border for image picker area */}

              {/* Display the selected image next to the icon */}
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                />
              )}

              {/* Button to trigger image picker */}
              <Button
                className="bg-white h-[100px] w-[100px]"
                onPress={pickImage}
              >
                <ButtonText size="md" className="text-center">
                  <MaterialIcons name="add" size={24} color="#000" />
                </ButtonText>
              </Button>
            </View>
          </Box>

          {/* Submit Button */}
          <Button
            className="px-4 py-2 mr-0 mb-3 h-[50px] bg-blue-400 rou"
            onPress={handleSubmit(onPressSend)}
          >
            <ButtonText size="md">Add Product</ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormComponent;
