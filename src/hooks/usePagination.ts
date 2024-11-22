import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPagination,
  goToNextPage,
  goToPreviousPage,
} from "@/redux/slices/paginationSlice";
import { paginatePages } from "@/utils/prices";
import { RootState } from "@/redux/store";

export const usePagination = (data: any[]) => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector(
    (state: RootState) => state.pagination
  );

  console.log(currentPage, totalPages);

  React.useEffect(() => {
    dispatch(
      setPagination({
        currentPage: 0,
        totalPages: Math.ceil(data.length / 10),
      })
    );
  }, [data, dispatch]);

  const pages = paginatePages(data);

  const handleNextPage = () => {
    dispatch(goToNextPage());
  };

  const handlePreviousPage = () => {
    dispatch(goToPreviousPage());
  };

  return {
    pages,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
  };
};
