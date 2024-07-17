import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIElementState = {
  [key: string]: boolean | string;
};

const initialState: UIElementState = {
  authSidebar: false,
  profileModal: false,
  cartModal: false,
  navSidebar: false,
  searchBarModal: false,
  gameImageModal: false,
  resolution: true,
  searchGenreText: "",
  searchPlatformText: "",
  searchPublisherText: "",
  searchStoreText: "",
  publishersModal: false,
  platformsModal: false,
  genresModal: false,
  storesModal: false,
  visibleModal: "",
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
    setVisibleModal: (state, action: PayloadAction<string>) => {
      const visibleModal = action.payload;
      Object.keys(state).forEach((key) => {
        if (key.endsWith("Modal")) {
          state[key] = false;
        }
      });
      state[visibleModal] = true;
      state.visibleModal = visibleModal;
    },
  },
});

export const {
  close,
  open,
  toggle,
  toggleScreen,
  setSearchText,
  setVisibleModal,
} = utilitySlice.actions;
export default utilitySlice.reducer;
