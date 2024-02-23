import { User } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

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
  reducers: {},
});

export default userSlice.reducer;
