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
  gameImageModal: false,
  isMediumScreen: false,
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
    toggleMediumScreen: (state, action: PayloadAction<boolean>) => {
      state.isMediumScreen = action.payload;
    },
  },
});

export const { close, open, toggleMediumScreen } = utilitySlice.actions;
export default utilitySlice.reducer;
