import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showPagination,
  nextPage,
  prevPage,
  goToPage,
} from "@/redux/slices/pagination/paginationSlice";
import { paginatePages } from "@/utils/pagination";
import { RootState } from "@/redux/store";

export default function usePagination<T>(data: T[]) {
  const dispatch = useDispatch();

  const pagination = useSelector((state: RootState) => state.pagination);

  const pages = paginatePages(data);

  React.useEffect(() => {
    dispatch(
      showPagination({
        currentPage: pagination.currentPage,
        totalPages: pages.length - 1,
      })
    );
  }, [data, pagination.currentPage, dispatch]);

  React.useEffect(() => {
    dispatch(
      showPagination({
        currentPage: 0,
        totalPages: pages.length,
      })
    );
  }, []);

  const handleSetCurrentPage = (page: number) => {
    dispatch(goToPage(page));
  };

  const handleNextPage = () => {
    dispatch(nextPage());
  };

  const handlePreviousPage = () => {
    dispatch(prevPage());
  };

  return {
    pages,
    pagination,
    handleSetCurrentPage,
    handleNextPage,
    handlePreviousPage,
  };
}
