import { createSlice } from "@reduxjs/toolkit";

const utilitySlice = createSlice({
  name: "utility",
  initialState: {
    isSidebarOpen: false,
  },
  reducers: {
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
      console.log(state.isSidebarOpen);
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
  },
});

export const { closeSidebar, openSidebar } = utilitySlice.actions;
export default utilitySlice.reducer;
