import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UIElementState = {
  [key: string]: boolean;
};

const initialState: UIElementState = {
  userSidebar: false,
  profileModal: false,
  cartModal: false,
  navSidebar: false,
  mobileSearchModal: false,
  gameImageModal: false,
  resolution: true,
  desktopSearchBar: false,
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
    toggle: (state, action: PayloadAction<string>) => {
      const element = action.payload;
      state[element] = !state[element];
    },
    toggleScreen: (state, action: PayloadAction<boolean>) => {
      state.resolution = action.payload;
    },
  },
});

export const { close, open, toggle, toggleScreen } = utilitySlice.actions;
export default utilitySlice.reducer;
