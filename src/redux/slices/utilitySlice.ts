import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UIElementState = {
  [key: string]: boolean;
};

const initialState: UIElementState = {
  userSidebar: false,
  myCart: false,
  navSidebar: false,
};

const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    close: (state, action: PayloadAction<string>) => {
      const element = action.payload;
      state[element] = false;
    },
    open: (state, action: PayloadAction<string>) => {
      const element = action.payload;
      state[element] = true;
    },
  },
});

export const { close, open } = utilitySlice.actions;
export default utilitySlice.reducer;
