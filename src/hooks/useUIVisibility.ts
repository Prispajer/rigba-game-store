import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { open, close, toggleScreen, toggle } from "@/redux/slices/ui/uiSlice";
import { RootState } from "../redux/store";
import { Root } from "postcss";

export default function useUIVisibility() {
  const dispatch = useDispatch();

  const authSidebarState = useSelector(
    (state: RootState) => state.ui.authSidebar
  );
  const profileModalState = useSelector(
    (state: RootState) => state.ui.profileModal
  );
  const cartModalState = useSelector((state: RootState) => state.ui.cartModal);
  const navSidebarState = useSelector(
    (state: RootState) => state.ui.navSidebar
  );
  const searchBarState = useSelector(
    (state: RootState) => state.ui.searchBarModal
  );
  const accountSidebarState = useSelector(
    (state: RootState) => state.ui.accountSidebar
  );
  const gameScreenshotModalState = useSelector(
    (state: RootState) => state.ui.gameScreenshotModal
  );
  const resolutionState = useSelector(
    (state: RootState) => state.ui.resolution
  );
  const publishersModalState = useSelector(
    (state: RootState) => state.ui.publishersModal
  );
  const platformsModalState = useSelector(
    (state: RootState) => state.ui.platformsModal
  );
  const genresModalState = useSelector(
    (state: RootState) => state.ui.genresModal
  );
  const storesModalState = useSelector(
    (state: RootState) => state.ui.storesModal
  );
  const sortModalState = useSelector((state: RootState) => state.ui.sortModal);
  const sortAndFilterModalState = useSelector(
    (state: RootState) => state.ui.sortAndFilterModal
  );
  const twoFactorModalState = useSelector(
    (state: RootState) => state.ui.twoFactorModal
  );
  const sortMenuState = useSelector((state: RootState) => state.ui.sortMenu);
  const priceMenuState = useSelector((state: RootState) => state.ui.priceMenu);
  const publishersMenuState = useSelector(
    (state: RootState) => state.ui.publishersMenu
  );
  const platformsMenuState = useSelector(
    (state: RootState) => state.ui.platformsMenu
  );
  const genresMenuState = useSelector(
    (state: RootState) => state.ui.genresMenu
  );
  const storesMenuState = useSelector(
    (state: RootState) => state.ui.storesMenu
  );

  const handleOpen = (element: string): void => {
    dispatch(open(element));
  };

  const handleClose = (element: string): void => {
    dispatch(close(element));
  };

  const handleToggle = (element: string): void => {
    dispatch(toggle(element));
  };

  const handleToggleScreen = React.useCallback(
    (resolution: number) => {
      return () => {
        const windowScreen = window.innerWidth >= resolution;
        dispatch(toggleScreen(windowScreen));
      };
    },
    [dispatch]
  );

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
    handleOpen,
    handleClose,
    handleToggle,
    handleToggleScreen,
  };
}
