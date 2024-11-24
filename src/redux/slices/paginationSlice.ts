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
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    goToNextPage: (state) => {
      if (state.currentPage <= state.totalPages) {
        state.currentPage += 1;
      }
    },
    goToPreviousPage: (state) => {
      if (state.currentPage > 0) {
        state.currentPage -= 1;
      }
    },
    resetPagination: (state) => {
      state.currentPage = 1;
      state.totalPages = 0;
    },
  },
});

export const {
  setPagination,
  setCurrentPage,
  goToNextPage,
  goToPreviousPage,
  resetPagination,
} = paginationSlice.actions;

export default paginationSlice.reducer;
