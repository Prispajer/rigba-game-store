import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "@/redux/slices/utilitySlice";
import useFetchGameData from "./useFetchGameData";
import { RootState } from "../redux/store";

export default function useSearchText() {
  const { gamesFilterState } = useFetchGameData();
  const dispatch = useDispatch();

  const searchGenreTextState = useSelector(
    (state: RootState) => state.utility.searchGenreText
  );
  const searchPlatformTextState = useSelector(
    (state: RootState) => state.utility.searchPlatformText
  );
  const searchPublisherTextState = useSelector(
    (state: RootState) => state.utility.searchPublisherText
  );
  const searchStoreTextState = useSelector(
    (state: RootState) => state.utility.searchStoreText
  );
  const compartmentNumberOne = useSelector(
    (state: RootState) => state.utility.compartmentNumberOne
  );
  const compartmentNumberTwo = useSelector(
    (state: RootState) => state.utility.compartmentNumberTwo
  );

  const handleSetSearchText = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch(setSearchText({ key, value: event.target.value }));
  };

  const handleComparePrices = (firstNumber: number, secondNumber: number) => {
    return gamesFilterState.gamesWithFilters.filter((game) => {
      return game.price > firstNumber && game.price < secondNumber;
    });
  };

  return {
    searchGenreTextState,
    searchPlatformTextState,
    searchPublisherTextState,
    searchStoreTextState,
    compartmentNumberOne,
    compartmentNumberTwo,
    handleSetSearchText,
    handleComparePrices,
  };
}
