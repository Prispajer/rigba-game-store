import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIElementState = {
  [key: string]: boolean | string;
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
  searchGenreText: "",
  searchPlatformText: "",
  searchPublisherText: "",
  searchStoreText: "",
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
    setSearchText: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { close, open, toggle, toggleScreen, setSearchText } =
  utilitySlice.actions;
export default utilitySlice.reducer;
