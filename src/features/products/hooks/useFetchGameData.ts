"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setGenresIdArray,
    setPlatformsIdArray,
    setStoresIdArray,
    setPublishersIdArray,
    setOrdering,
    setPage,
    setNextPage,
    setPreviousPage,
} from "@/features/products/redux/slices/filters/filtersSlice";
import { incrementPageSize } from "@/features/products/redux/slices/genres/genresSlice";
import { getProductsWithFilters } from "../redux/slices/filters/filters.thunk";
import useCustomRouter from "../../../hooks/useCustomRouter";
import debounce from "@/utils/debounce";
import { AppDispatch, RootState } from "@/redux/store";
import { PayloadAction, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { getPublishers } from "@/features/products/redux/slices/publishers/publishers.thunk";
import { getStores } from "@/features/products/redux/slices/stores/stores.thunk";
import { getPlatforms } from "@/features/products/redux/slices/platforms/platforms.thunk";
import { getGenres } from "@/features/products/redux/slices/genres/genres.thunk";

export default function useFetchGameData() {
    const dispatch = useDispatch<AppDispatch>();
    const { redirectToFilters } = useCustomRouter();

    const productFilterState = useSelector((state: RootState) => state.productFilter);
    const productPublishersState = useSelector((state: RootState) => state.publishers);
    const productPlatformsState = useSelector((state: RootState) => state.platforms);
    const productGenresState = useSelector((state: RootState) => state.genres);
    const productStoresState = useSelector((state: RootState) => state.stores);

    const handleFetchProductsWithFilters = React.useMemo(
        () =>
            debounce(async (page: number) => {
                await dispatch(getProductsWithFilters({ page }));
            }, 700),
        [dispatch]
    );

    const handleFetchPublishers = React.useCallback(
        (quantity: number) => dispatch(getPublishers({ quantity })),
        [dispatch]
    );

    const handleFetchGenres = React.useCallback(
        (quantity: number) => dispatch(getGenres({ quantity })),
        [dispatch]
    );

    const handleFetchPlatforms = React.useCallback(
        (quantity: number) => dispatch(getPlatforms({ quantity })),
        [dispatch]
    );

    const handleFetchStores = React.useCallback(
        (quantity: number) => dispatch(getStores({ quantity })),
        [dispatch]
    );

    const handleSetGenresIdArray = React.useCallback(
        (genresId: number[]) => dispatch(setGenresIdArray(genresId)),
        [dispatch]
    );

    const handleSetPlatformsIdArray = React.useCallback(
        (platformsId: number[]) => dispatch(setPlatformsIdArray(platformsId)),
        [dispatch]
    );

    const handleSetStoresIdArray = React.useCallback(
        (storesId: number[]) => dispatch(setStoresIdArray(storesId)),
        [dispatch]
    );

    const handleSetPublishersIdArray = React.useCallback(
        (publishersId: number[]) => dispatch(setPublishersIdArray(publishersId)),
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
        (ordering: string) => {
            dispatch(setOrdering(ordering));
            redirectToFilters(ordering);
        },
        [dispatch, redirectToFilters]
    );

    const handleFilterChange = React.useCallback(
        (
            filterId: number,
            array: number[],
            callback: (updatedFilters: number[]) => PayloadAction<number[]>
        ) => {
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
        dispatch(incrementPageSize());
    }, [dispatch]);

    const handleComparePrices = (firstNumber: number, secondNumber: number) => {
        return productFilterState.productsWithFilters.filter(
            (game) => game.price > firstNumber && game.price < secondNumber
        );
    };

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
        handleComparePrices
    };
}