import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  id: undefined,
  email: undefined,
  password: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (
      state,
      action: PayloadAction<{
        email: string | undefined;
        password: string | undefined;
        confirmPassword: string | undefined;
      }>
    ) => {
      const { email, password, confirmPassword } = action.payload;
      return { ...state, email, password, confirmPassword };
    },
    loginUser: (
      state,
      action: PayloadAction<{
        email: string | undefined;
        password: string | undefined;
      }>
    ) => {
      const { email, password } = action.payload;
      return { ...state, email, password };
    },
  },
});

export const { registerUser, loginUser } = userSlice.actions;
export default userSlice.reducer;
