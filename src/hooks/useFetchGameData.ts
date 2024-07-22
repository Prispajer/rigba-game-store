"use client";
import React, { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchGamesWithFilters,
  setGenresIdArray,
  setPlatformsIdArray,
  setStoresIdArray,
  setPublishersIdArray,
  setOrdering,
  setPage,
  setNextPage,
  setPreviousPage,
} from "@/redux/slices/gamesFilterSlice";
import { loadMore } from "@/redux/slices/gamesGenresSlice";
import { fetchPublishers } from "@/redux/slices/gamesPublishersSlice";
import { fetchGenres } from "@/redux/slices/gamesGenresSlice";
import { fetchStores } from "@/redux/slices/gamesStoresSlice";
import { fetchPlatforms } from "@/redux/slices/gamesPlatformsSlice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function useFetchGameData() {
  const dispatch = useDispatch<AppDispatch>();
  const gamesFilterState = useSelector((state: RootState) => state.gamesFilter);
  const gamesPublishersState = useSelector(
    (state: RootState) => state.gamesPublishers
  );
  const gamesPlatformsState = useSelector(
    (state: RootState) => state.gamesPlatforms
  );
  const gamesGenresState = useSelector((state: RootState) => state.gamesGenres);
  const gamesStoresState = useSelector((state: RootState) => state.gamesStores);

  const handleFetchGamesWithFilters = React.useCallback(
    (page: number) => {
      dispatch(fetchGamesWithFilters({ page }));
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

  const handleSortChange = React.useCallback(
    (ordering: string) => {
      dispatch(setOrdering(ordering));
      handleFetchGamesWithFilters(gamesFilterState.page);
    },
    [dispatch, gamesFilterState.page, handleFetchGamesWithFilters]
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

  const handleClearAllFilters = React.useCallback(() => {
    handleSetPublishersIdArray([]);
    handleSetPlatformsIdArray([]);
    handleSetGenresIdArray([]);
    handleSetStoresIdArray([]);
    handleFetchGamesWithFilters(gamesFilterState.page);
  }, [
    handleSetPublishersIdArray,
    handleSetPlatformsIdArray,
    handleSetGenresIdArray,
    handleSetStoresIdArray,
    handleFetchGamesWithFilters,
    gamesFilterState.page,
  ]);

  const handleClearSelectedFilter = React.useCallback(
    (callback: ActionCreatorWithPayload<number[]>) => {
      dispatch(callback([]));
      handleFetchGamesWithFilters(gamesFilterState.page);
    },
    [dispatch, handleFetchGamesWithFilters, gamesFilterState.page]
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

  const handleLoadMore = React.useCallback(() => {
    dispatch(loadMore());
  }, [dispatch]);

  return {
    gamesFilterState,
    gamesPublishersState,
    gamesPlatformsState,
    gamesGenresState,
    gamesStoresState,
    handleFetchGamesWithFilters,
    handleFetchPublishers,
    handleFetchGenres,
    handleFetchPlatforms,
    handleFetchStores,
    handleFilterChange,
    handleSetGenresIdArray,
    handleSetStoresIdArray,
    handleSetPublishersIdArray,
    handleSortChange,
    handleSetPage,
    handleClearAllFilters,
    handleClearSelectedFilter,
    handleSetPlatformsIdArray,
    handleSetNextPage,
    handleSetPreviousPage,
    handleLoadMore,
  };
}
