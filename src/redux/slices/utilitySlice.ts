import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UIElementState = {
  [key: string]: boolean;
};

const initialState: UIElementState = {
  userSidebar: false,
  myCart: false,
  navSidebar: false,
  searchSidebar: false,
};

const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    closeSidebar: (state, action: PayloadAction<string>) => {
      const element = action.payload;
      state[element] = false;
    },
    openSidebar: (state, action: PayloadAction<string>) => {
      const element = action.payload;
      state[element] = true;
    },
  },
});

export const { closeSidebar, openSidebar } = utilitySlice.actions;
export default utilitySlice.reducer;
