import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    showPagination,
    nextPage,
    prevPage,
    goToPage,
} from "@/redux/slices/pagination/paginationSlice";
import { paginatePages } from "@/utils/pagination";
import {
    selectCurrentPageState,
    selectTotalPagesState,
} from "@/redux/slices/pagination/pagination.selectors";

export default function usePagination<T>(data: T[]) {
    const dispatch = useDispatch();

    const currentPageState = useSelector(selectCurrentPageState);
    const totalPagesState = useSelector(selectTotalPagesState);

    const paginatedPages = React.useMemo(() => paginatePages(data), [data]);

    const handleShowPagination = React.useCallback(
        (currentPage: number, totalPages: number) => {
            dispatch(showPagination({ currentPage, totalPages }));
        },
        [dispatch]
    );

    const handleSetCurrentPage = React.useCallback(
        (page: number) => {
            dispatch(goToPage(page));
        },
        [dispatch]
    );

    const handleNextPage = React.useCallback(() => {
        dispatch(nextPage());
    }, [dispatch]);

    const handlePreviousPage = React.useCallback(() => {
        dispatch(prevPage());
    }, [dispatch]);

    React.useEffect(() => {
        handleShowPagination(0, paginatedPages.length);
    }, [handleShowPagination, paginatedPages.length]);

    return {
        paginatedPages,
        currentPageState,
        totalPagesState,
        handleSetCurrentPage,
        handleNextPage,
        handlePreviousPage,
    };
}