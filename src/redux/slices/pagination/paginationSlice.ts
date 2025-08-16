import { PaginationState, PaginationPayload } from "./pagination.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PaginationState = {
  currentPage: 0,
  totalPages: 0,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    showPagination: (state, action: PayloadAction<PaginationPayload>) => {
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    goToPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    nextPage: (state) => {
      if (state.totalPages > 0 && state.currentPage < state.totalPages) {
        state.currentPage += 1;
      }
    },
    prevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    clearPagination: (state) => {
      state.currentPage = 1;
      state.totalPages = 0;
    },
  },
});

export const { showPagination, goToPage, nextPage, prevPage, clearPagination } =
  paginationSlice.actions;

export default paginationSlice.reducer;
