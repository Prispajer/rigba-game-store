import { User } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { retry } from "@reduxjs/toolkit/query";

const initialState: User = {
  id: undefined,
  login: undefined,
  password: undefined,
  registerDate: undefined,
  lastLoggedIn: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (
      state,
      action: PayloadAction<{
        id: number | undefined;
        login: string | undefined;
        password: string | undefined;
        registerDate: Date | undefined;
        lastLoggedIn: Date | undefined;
      }>
    ) => {
      const { id, login, password, registerDate, lastLoggedIn } =
        action.payload;
      return { ...state, id, login, password, registerDate, lastLoggedIn };
    },
  },
});

export const { registerUser } = userSlice.actions;
export default userSlice.reducer;
