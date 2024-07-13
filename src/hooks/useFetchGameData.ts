import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchGamesWithFilters,
  setGenresIdArray,
  setPlatformsIdArray,
  setStoresIdArray,
  setPublishersIdArray,
  setPage,
  setNextPage,
  setPreviousPage,
} from "@/redux/slices/gamesFilterSlice";

export default function useFetchGameData() {
  const dispatch = useDispatch<AppDispatch>();
  const gamesFilterState = useSelector((state: RootState) => state.gamesFilter);

  const handleFetchGamesWithFilters = React.useCallback(
    (page: number) => {
      dispatch(fetchGamesWithFilters({ page }));
    },
    [dispatch]
  );

  const handleSetPage = React.useCallback(
    (page: number) => {
      if (page > 0 && page <= 20) {
        dispatch(setPage({ page }));
        handleFetchGamesWithFilters(page);
      }
    },
    [dispatch, handleFetchGamesWithFilters]
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
      handleFetchGamesWithFilters(gamesFilterState.page);
    },
    [dispatch, handleFetchGamesWithFilters, gamesFilterState.page]
  );

  const handleSetGenresIdArray = React.useCallback(
    (genresId: number[]) => {
      dispatch(setGenresIdArray(genresId));
      handleFetchGamesWithFilters(gamesFilterState.page);
    },
    [dispatch, handleFetchGamesWithFilters, gamesFilterState.page]
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

  const handleSetNextPage = React.useCallback(() => {
    if (gamesFilterState.page < 20) {
      dispatch(setNextPage());
    }
  }, [dispatch, gamesFilterState.page]);

  const handleSetPreviousPage = React.useCallback(() => {
    if (gamesFilterState.page > 1) {
      dispatch(setPreviousPage());
    }
  }, [dispatch, gamesFilterState.page]);

  return {
    gamesFilterState,
    handleFetchGamesWithFilters,
    handleFilterChange,
    handleSetGenresIdArray,
    handleSetStoresIdArray,
    handleSetPublishersIdArray,
    handleSetPage,
    handleSetPlatformsIdArray,
    handleSetNextPage,
    handleSetPreviousPage,
  };
}
