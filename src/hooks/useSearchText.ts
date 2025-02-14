import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, clearSearchText } from "@/redux/slices/utilitySlice";
import useFetchGameData from "./useFetchGameData";
import { RootState } from "../redux/store";

export default function useSearchText() {
  const dispatch = useDispatch();
  const { productFilterState } = useFetchGameData();

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
  const searchWistListTextState = useSelector(
    (state: RootState) => state.utility.searchWishListText
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

  const handleClearSearchText = (key: string): void => {
    dispatch(clearSearchText({ key }));
  };

  const handleComparePrices = (firstNumber: number, secondNumber: number) => {
    return productFilterState.productsWithFilters.filter((game) => {
      return game.price > firstNumber && game.price < secondNumber;
    });
  };

  return {
    searchGenreTextState,
    searchPlatformTextState,
    searchPublisherTextState,
    searchStoreTextState,
    searchWistListTextState,
    compartmentNumberOne,
    compartmentNumberTwo,
    handleSetSearchText,
    handleClearSearchText,
    handleComparePrices,
  };
}
