import { createSlice } from "@reduxjs/toolkit";
import { getPublishers } from "./publishers.thunk";
import { PublishersState } from "./publishers.types";

const initialState: PublishersState = {
  publishersArray: [],
  isLoading: false,
  error: null,
  page_size: 1,
};

const publishersSlice = createSlice({
  name: "publishers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPublishers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPublishers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publishersArray = action.payload;
      })
      .addCase(getPublishers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default publishersSlice.reducer;
