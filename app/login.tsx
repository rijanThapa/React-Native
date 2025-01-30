// Login.tsx
import React from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/slices";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "@/store/slices/userSlice";
import { useMutation } from "react-query";
import { login } from "@/api/service/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const userLoading = useSelector((state: RootState) => state.user.loading);
  const userError = useSelector((state: RootState) => state.user.error);

  const mutation = useMutation(login, {
    onMutate: () => {
      dispatch(loginRequest());
    },
    onSuccess: (response) => {
      dispatch(loginSuccess(response));
      AsyncStorage.setItem("token", response?.data?.jwt_token);
      AsyncStorage.setItem("userId", String(response?.data?.id));

      router.push("/");
    },
    onError: (error: any) => {
      dispatch(loginFailure(error.message));
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    mutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Button
        title={userLoading ? "Logging in..." : "Login"}
        onPress={handleSubmit(onSubmit)} // Trigger the onSubmit handler
        disabled={userLoading}
      />
      {userError && <Text style={styles.error}>{userError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    minHeight: 48,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default Login;
