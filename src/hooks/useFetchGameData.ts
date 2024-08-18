"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsWithFilters,
  setGenresIdArray,
  setPlatformsIdArray,
  setStoresIdArray,
  setPublishersIdArray,
  setOrdering,
  setPage,
  setNextPage,
  setPreviousPage,
} from "@/redux/slices/productFiltersSlice";
import { loadMore } from "@/redux/slices/productGenresSlice";
import { fetchPublishers } from "@/redux/slices/productPublishersSlice";
import { fetchGenres } from "@/redux/slices/productGenresSlice";
import { fetchStores } from "@/redux/slices/productStoresSlice";
import { fetchPlatforms } from "@/redux/slices/productPlatformsSlice";
import useCustomRouter from "./useCustomRouter";
import { AppDispatch, RootState } from "@/redux/store";

export default function useFetchGameData() {
  const dispatch = useDispatch<AppDispatch>();
  const productFilterState = useSelector(
    (state: RootState) => state.productFilter
  );
  const productPublishersState = useSelector(
    (state: RootState) => state.productPublishers
  );
  const productPlatformsState = useSelector(
    (state: RootState) => state.productPlatforms
  );
  const productGenresState = useSelector(
    (state: RootState) => state.productGenres
  );
  const productStoresState = useSelector(
    (state: RootState) => state.productStores
  );

  const { pushOrderingToUrl } = useCustomRouter();

  const handleFetchProductsWithFilters = React.useCallback(
    (page: number) => {
      dispatch(fetchProductsWithFilters({ page }));
    },
    [dispatch]
  );

  const handleFetchPublishers = React.useCallback(
    (quantity: number) => {
      dispatch(fetchPublishers({ quantity }));
    },
    [dispatch]
  );

  const handleFetchGenres = React.useCallback(
    (quantity: number) => {
      dispatch(fetchGenres({ quantity }));
    },
    [dispatch]
  );

  const handleFetchPlatforms = React.useCallback(
    (quantity: number) => {
      dispatch(fetchPlatforms({ quantity }));
    },
    [dispatch]
  );

  const handleFetchStores = React.useCallback(
    (quantity: number) => {
      dispatch(fetchStores({ quantity }));
    },
    [dispatch]
  );

  const handleSetGenresIdArray = React.useCallback(
    (genresId: number[]) => {
      dispatch(setGenresIdArray(genresId));
    },
    [dispatch]
  );

  const handleSetPlatformsIdArray = React.useCallback(
    (platformsId: number[]) => {
      dispatch(setPlatformsIdArray(platformsId));
    },
    [dispatch]
  );

  const handleSetStoresIdArray = React.useCallback(
    (storesId: number[]) => {
      dispatch(setStoresIdArray(storesId));
    },
    [dispatch]
  );

  const handleSetPublishersIdArray = React.useCallback(
    (publishersId: number[]) => {
      dispatch(setPublishersIdArray(publishersId));
    },
    [dispatch]
  );

  const handleFilterSortChange = React.useCallback(
    (ordering: string) => {
      dispatch(setOrdering(ordering));
      handleFetchProductsWithFilters(productFilterState.page);
    },
    [dispatch, productFilterState.page, handleFetchProductsWithFilters]
  );

  const handleSetOrdering = React.useCallback(
    (ordering: string): void => {
      dispatch(setOrdering(ordering));
      pushOrderingToUrl(productFilterState.ordering);
    },
    [dispatch, pushOrderingToUrl, productFilterState.ordering]
  );

  const handleFilterChange = React.useCallback(
    (
      filterId: number,
      array: number[],
      callback: (updatedFilters: number[]) => PayloadAction<number[]>
    ): void => {
      const updatedFilters = array.includes(filterId)
        ? array.filter((id) => id !== filterId)
        : [...array, filterId];
      dispatch(callback(updatedFilters));
      handleFetchProductsWithFilters(productFilterState.page);
    },
    [dispatch, handleFetchProductsWithFilters, productFilterState.page]
  );

  const handleClearAllFilters = React.useCallback(() => {
    handleSetGenresIdArray([]);
    handleSetPlatformsIdArray([]);
    handleSetStoresIdArray([]);
    handleSetPublishersIdArray([]);
  }, [
    handleSetGenresIdArray,
    handleSetPlatformsIdArray,
    handleSetStoresIdArray,
    handleSetPublishersIdArray,
  ]);

  const handleClearSelectedFilter = React.useCallback(
    (callback: ActionCreatorWithPayload<number[]>) => {
      dispatch(callback([]));
      handleFetchProductsWithFilters(productFilterState.page);
    },
    [dispatch, handleFetchProductsWithFilters, productFilterState.page]
  );

  const handleSetPage = React.useCallback(
    (page: number) => {
      if (page > 0 && page <= 20) {
        dispatch(setPage({ page }));
        handleFetchProductsWithFilters(page);
      }
    },
    [dispatch, handleFetchProductsWithFilters]
  );

  const handleSetNextPage = React.useCallback(() => {
    if (productFilterState.page < 20) {
      dispatch(setNextPage());
      handleFetchProductsWithFilters(productFilterState.page);
    }
  }, [dispatch, productFilterState.page, handleFetchProductsWithFilters]);

  const handleSetPreviousPage = React.useCallback(() => {
    if (productFilterState.page > 1) {
      dispatch(setPreviousPage());
      handleFetchProductsWithFilters(productFilterState.page);
    }
  }, [dispatch, productFilterState.page, handleFetchProductsWithFilters]);

  const handleLoadMore = React.useCallback(() => {
    dispatch(loadMore());
  }, [dispatch]);

  return {
    productFilterState,
    productPublishersState,
    productPlatformsState,
    productGenresState,
    productStoresState,
    handleFetchProductsWithFilters,
    handleFetchPublishers,
    handleFetchGenres,
    handleFetchPlatforms,
    handleFetchStores,
    handleFilterChange,
    handleSetGenresIdArray,
    handleSetStoresIdArray,
    handleSetPublishersIdArray,
    handleFilterSortChange,
    handleSetOrdering,
    handleSetPage,
    handleClearAllFilters,
    handleClearSelectedFilter,
    handleSetPlatformsIdArray,
    handleSetNextPage,
    handleSetPreviousPage,
    handleLoadMore,
  };
}
