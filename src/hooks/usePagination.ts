import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPagination,
  goToNextPage,
  goToPreviousPage,
  setCurrentPage,
} from "@/redux/slices/paginationSlice";
import { paginatePages } from "@/utils/prices";
import { RootState } from "@/redux/store";

export default function usePagination(data: any[]) {
  const dispatch = useDispatch();
  const paginationState = useSelector((state: RootState) => state.pagination);

  const pages = paginatePages(data);

  React.useEffect(() => {
    dispatch(
      setPagination({
        currentPage: paginationState.currentPage,
        totalPages: pages.length - 1,
      })
    );
  }, [data, paginationState.currentPage, dispatch]);

  React.useEffect(() => {
    dispatch(
      setPagination({
        currentPage: 0,
        totalPages: pages.length - 1,
      })
    );
  }, []);

  const handleSetCurrentPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleNextPage = () => {
    dispatch(goToNextPage());
  };

  const handlePreviousPage = () => {
    dispatch(goToPreviousPage());
  };

  return {
    pages,
    paginationState,
    handleSetCurrentPage,
    handleNextPage,
    handlePreviousPage,
  };
}
