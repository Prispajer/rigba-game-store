import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  totalPages: number;
}

const initialState: PaginationState = {
  currentPage: 0,
  totalPages: 0,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPagination: (
      state,
      action: PayloadAction<{ currentPage: number; totalPages: number }>
    ) => {
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    goToNextPage: (state) => {
      if (state.currentPage < state.totalPages - 1) {
        state.currentPage += 1;
      }
    },
    goToPreviousPage: (state) => {
      if (state.currentPage > 0) {
        state.currentPage -= 1;
      }
    },
  },
});

export const { setPagination, goToNextPage, goToPreviousPage } =
  paginationSlice.actions;

export default paginationSlice.reducer;
