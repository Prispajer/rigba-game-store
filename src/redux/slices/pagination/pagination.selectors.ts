import { RootState } from "@/redux/store";

export const selectCurrentPageState = (state: RootState) => state.pagination.currentPage;
export const selectTotalPagesState = (state: RootState) => state.pagination.totalPages;
