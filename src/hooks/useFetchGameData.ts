import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchGamesByGenresId,
  setGenresId,
  setPlatformsId,
  setStoresId,
  setPublishersId,
  setPage,
  setNextPage,
  setPreviousPage,
} from "@/redux/slices/productFetchAndFilterSlice";

export default function useFetchGameData() {
  const dispatch = useDispatch<AppDispatch>();
  const productFetchAndFilterState = useSelector(
    (state: RootState) => state.productFetchAndFilter
  );

  const handleFetchGamesByGenresId = React.useCallback(
    (page: number) => {
      dispatch(fetchGamesByGenresId({ page }));
    },
    [dispatch]
  );

  const handleSetPage = React.useCallback(
    (page: number) => {
      if (page > 0 && page <= 20) {
        dispatch(setPage({ page }));
        handleFetchGamesByGenresId(page);
      }
    },
    [dispatch, handleFetchGamesByGenresId]
  );
  const handleFilterChange = React.useCallback(
    (
      filterId: number,
      array: number[],
      callback: (updatedFilters: number[]) => any
    ) => {
      const updatedFilters = array.includes(filterId)
        ? array.filter((id) => id !== filterId)
        : [...array, filterId];
      dispatch(callback(updatedFilters));
      handleFetchGamesByGenresId(productFetchAndFilterState.page);
    },
    [dispatch, handleFetchGamesByGenresId, productFetchAndFilterState.page]
  );

  const handleFilterSearch = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>, array: []) => {
      const value = "Action" as string;

      if (array.includes(value)) {
        array.filter((name) => name === value);
      }
    },
    []
  );

  const handleSetGenresId = React.useCallback(
    (genresId: number[]) => {
      dispatch(setGenresId(genresId));
      handleFetchGamesByGenresId(productFetchAndFilterState.page);
    },
    [dispatch, handleFetchGamesByGenresId, productFetchAndFilterState.page]
  );

  const handleSetPlatformsId = React.useCallback(
    (platformsId: number[]) => {
      dispatch(setPlatformsId(platformsId));
    },
    [dispatch]
  );

  const handleSetStoresId = React.useCallback(
    (storesId: number[]) => {
      dispatch(setStoresId(storesId));
    },
    [dispatch]
  );

  const handleSetPublishersId = React.useCallback(
    (publishersId: number[]) => {
      dispatch(setPublishersId(publishersId));
    },
    [dispatch]
  );

  const handleSetNextPage = React.useCallback(() => {
    if (productFetchAndFilterState.page < 20) {
      dispatch(setNextPage());
      handleFetchGamesByGenresId(productFetchAndFilterState.page + 1);
    }
  }, [dispatch, productFetchAndFilterState.page, handleFetchGamesByGenresId]);

  const handleSetPreviousPage = React.useCallback(() => {
    if (productFetchAndFilterState.page > 1) {
      dispatch(setPreviousPage());
      handleFetchGamesByGenresId(productFetchAndFilterState.page - 1);
    }
  }, [dispatch, productFetchAndFilterState.page, handleFetchGamesByGenresId]);

  return {
    productFetchAndFilterState,
    handleFetchGamesByGenresId,
    handleFilterChange,
    handleFilterSearch,
    handleSetPlatformsId,
    handleSetStoresId,
    handleSetPublishersId,
    handleSetPage,
    handleSetGenresId,
    handleSetNextPage,
    handleSetPreviousPage,
  };
}
