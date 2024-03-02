import { RegisterSchema } from "@/utils/schemas/rei";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { retry } from "@reduxjs/toolkit/query";

const initialState: User = {
  id: undefined,
  email: undefined,
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
        email: string | undefined;
        password: string | undefined;
        registerDate: Date | undefined;
        lastLoggedIn: Date | undefined;
      }>
    ) => {
      const { id, email, password, registerDate, lastLoggedIn } =
        action.payload;
      return { ...state, id, email, password, registerDate, lastLoggedIn };
    },
  },
});

export const { registerUser } = userSlice.actions;
export default userSlice.reducer;
