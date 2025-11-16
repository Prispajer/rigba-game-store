import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setSearchText,
    clearSearchText,
} from "@/redux/slices/search/searchSlice";
import {
    selectSearchGenreTextState,
    selectSearchPlatformTextState,
    selectSearchPublisherTextState,
    selectSearchStoreTextState,
    selectSearchWishlistTextState,
    selectCompartmentNumberOneState,
    selectCompartmentNumberTwoState,
} from "@/redux/slices/search/search.selectors";

export default function  useSearchText() {
    const dispatch = useDispatch();

    const searchGenreTextState = useSelector(selectSearchGenreTextState);
    const searchPlatformTextState = useSelector(selectSearchPlatformTextState);
    const searchPublisherTextState = useSelector(selectSearchPublisherTextState);
    const searchStoreTextState = useSelector(selectSearchStoreTextState);
    const searchWishlistTextState = useSelector(selectSearchWishlistTextState);
    const compartmentNumberOneState = useSelector(selectCompartmentNumberOneState);
    const compartmentNumberTwoState = useSelector(selectCompartmentNumberTwoState);

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
        compartmentNumberOneState,
        compartmentNumberTwoState,
        handleSetSearchText,
        handleClearSearchText,
    };
}