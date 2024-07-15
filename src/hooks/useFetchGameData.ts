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
  setPage,
  setNextPage,
  setPreviousPage,
} from "@/redux/slices/gamesFilterSlice";
import { fetchPublishers } from "@/redux/slices/gamesPublishersSlice";
import { fetchGenres } from "@/redux/slices/gamesGenresSlice";
import { fetchStores } from "@/redux/slices/gamesStoresSlice";
import { fetchPlatforms } from "@/redux/slices/gamesPlatformsSlice";

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

  console.log(
    gamesPublishersState,
    gamesPlatformsState,
    gamesGenresState,
    gamesStoresState
  );
  const handleFetchGamesWithFilters = React.useCallback(
    (page: number) => {
      dispatch(fetchGamesWithFilters({ page }));
    },
    [dispatch]
  );

  const handleFetchPublishers = React.useCallback(
    (page: number) => {
      dispatch(fetchPublishers({ page }));
    },
    [dispatch]
  );
  const handleFetchGenres = React.useCallback(
    (page: number) => {
      dispatch(fetchGenres({ page }));
    },
    [dispatch]
  );
  const handleFetchPlatforms = React.useCallback(
    (page: number) => {
      dispatch(fetchPlatforms({ page }));
    },
    [dispatch]
  );
  const handleFetchStores = React.useCallback(
    (page: number) => {
      dispatch(fetchStores({ page }));
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

  const handleRemoveAllFilters = React.useCallback(() => {
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
    handleSetPage,
    handleRemoveAllFilters,
    handleSetPlatformsIdArray,
    handleSetNextPage,
    handleSetPreviousPage,
  };
}
