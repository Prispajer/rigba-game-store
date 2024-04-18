import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UIElementState = {
  [key: string]: boolean;
};

const initialState: UIElementState = {
  userSidebar: false,
  navSidebar: false,
  searchWindow: false,
  profileModal: false,
  cartModal: false,
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
