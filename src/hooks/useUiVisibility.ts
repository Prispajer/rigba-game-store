import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showElement, hideElement, toggleElement, setElement } from "@/redux/slices/ui/uiSlice";
import {
    selectAuthSidebarState,
    selectProfileModalState,
    selectCartModalState,
    selectNavSidebarState,
    selectSearchBarModalState,
    selectAccountSidebarState,
    selectGameScreenshotModalState,
    selectResolutionState,
    selectPublishersModalState,
    selectPlatformsModalState,
    selectGenresModalState,
    selectStoresModalState,
    selectSortModalState,
    selectSortAndFilterModalState,
    selectTwoFactorModalState,
    selectSortMenuState,
    selectPriceMenuState,
    selectPublishersMenuState,
    selectPlatformsMenuState,
    selectGenresMenuState,
    selectStoresMenuState, selectCheckoutStep,
} from "@/redux/slices/ui/ui.selectors";

export default function useUiVisibility() {
    const dispatch = useDispatch();

    const authSidebarState = useSelector(selectAuthSidebarState);
    const profileModalState = useSelector(selectProfileModalState);
    const cartModalState = useSelector(selectCartModalState);
    const navSidebarState = useSelector(selectNavSidebarState);
    const searchBarState = useSelector(selectSearchBarModalState);
    const accountSidebarState = useSelector(selectAccountSidebarState);
    const gameScreenshotModalState = useSelector(selectGameScreenshotModalState);
    const resolutionState = useSelector(selectResolutionState);
    const publishersModalState = useSelector(selectPublishersModalState);
    const platformsModalState = useSelector(selectPlatformsModalState);
    const genresModalState = useSelector(selectGenresModalState);
    const storesModalState = useSelector(selectStoresModalState);
    const sortModalState = useSelector(selectSortModalState);
    const sortAndFilterModalState = useSelector(selectSortAndFilterModalState);
    const twoFactorModalState = useSelector(selectTwoFactorModalState);
    const sortMenuState = useSelector(selectSortMenuState);
    const priceMenuState = useSelector(selectPriceMenuState);
    const publishersMenuState = useSelector(selectPublishersMenuState);
    const platformsMenuState = useSelector(selectPlatformsMenuState);
    const genresMenuState = useSelector(selectGenresMenuState);
    const storesMenuState = useSelector(selectStoresMenuState);
    const checkoutStepState = useSelector(selectCheckoutStep);

    const handleShowElement = React.useCallback((element: string): void => {
        dispatch(showElement(element));
    }, [dispatch]);

    const handleHideElement = React.useCallback((element: string): void => {
        dispatch(hideElement(element));
    }, [dispatch]);

    const handleToggleElement = React.useCallback((element: string): void => {
        dispatch(toggleElement(element));
    }, [dispatch]);

    const handleSetResolution = React.useCallback((): void => {
        const isWide = window.innerWidth >= 768;
        dispatch(setElement({ key: "resolution", value: isWide }));
    }, [dispatch]);

    const handleSetElement = React.useCallback((key: string): void => {
        const isWide = window.innerWidth >= 768;
        dispatch(setElement({ key: key, value: isWide}))
    }, [dispatch])

    return {
        authSidebarState,
        profileModalState,
        cartModalState,
        navSidebarState,
        searchBarState,
        accountSidebarState,
        gameScreenshotModalState,
        resolutionState,
        publishersModalState,
        platformsModalState,
        genresModalState,
        storesModalState,
        sortModalState,
        sortAndFilterModalState,
        twoFactorModalState,
        sortMenuState,
        priceMenuState,
        publishersMenuState,
        platformsMenuState,
        genresMenuState,
        storesMenuState,
        checkoutStepState,
        handleShowElement,
        handleHideElement,
        handleToggleElement,
        handleSetResolution,
        handleSetElement
    };
}