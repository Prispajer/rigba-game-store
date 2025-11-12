import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setSearchText,
    clearSearchText,
} from "@/redux/slices/search/searchSlice";
import {
    selectSearchGenreText,
    selectSearchPlatformText,
    selectSearchPublisherText,
    selectSearchStoreText,
    selectSearchWishlistText,
    selectCompartmentNumberOne,
    selectCompartmentNumberTwo,
} from "@/redux/slices/search/search.selectors";

export default function useSearchText() {
    const dispatch = useDispatch();

    const searchGenreTextState = useSelector(selectSearchGenreText);
    const searchPlatformTextState = useSelector(selectSearchPlatformText);
    const searchPublisherTextState = useSelector(selectSearchPublisherText);
    const searchStoreTextState = useSelector(selectSearchStoreText);
    const searchWishlistTextState = useSelector(selectSearchWishlistText);
    const compartmentNumberOne = useSelector(selectCompartmentNumberOne);
    const compartmentNumberTwo = useSelector(selectCompartmentNumberTwo);

    const handleSetSearchText = (
        key: string,
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        dispatch(setSearchText({ key, value: event.target.value }));
    };

    const handleClearSearchText = (key: string): void => {
        dispatch(clearSearchText({ key }));
    };

    return {
        searchGenreTextState,
        searchPlatformTextState,
        searchPublisherTextState,
        searchStoreTextState,
        searchWishlistTextState,
        compartmentNumberOne,
        compartmentNumberTwo,
        handleSetSearchText,
        handleClearSearchText,
    };
}