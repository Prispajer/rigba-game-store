import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "@/redux/slices/utilitySlice";
import { RootState } from "../redux/store";

export default function useSearchText() {
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

  const handleSetSearchText = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setSearchText({ key, value: event.target.value }));
  };

  return {
    searchGenreTextState,
    searchPlatformTextState,
    searchPublisherTextState,
    searchStoreTextState,
    handleSetSearchText,
  };
}
