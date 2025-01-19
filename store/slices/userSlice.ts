// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userInfo: {
    email: string;
    id: number;
    jwt_token: string;
    name: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      const { email, id, jwt_token, name } = action.payload.data;
      state.userInfo = { email, id, jwt_token, name };
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, clearUserInfo } =
  userSlice.actions;
export default userSlice.reducer;
