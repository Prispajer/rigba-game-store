import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  open,
  close,
  toggleScreen,
  toggle,
} from "@/redux/slices/window/windowSlice";
import { RootState } from "../redux/store";

export default function useWindowVisibility() {
  const dispatch = useDispatch();

  const authSidebarState = useSelector(
    (state: RootState) => state.window.authSidebar
  );
  const profileModalState = useSelector(
    (state: RootState) => state.window.profileModal
  );
  const cartModalState = useSelector(
    (state: RootState) => state.window.cartModal
  );
  const navSidebarState = useSelector(
    (state: RootState) => state.window.navSidebar
  );
  const searchBarState = useSelector(
    (state: RootState) => state.window.searchBarModal
  );
  const accountSidebarState = useSelector(
    (state: RootState) => state.window.accountSidebar
  );
  const gameScreenshotModalState = useSelector(
    (state: RootState) => state.window.gameScreenshotModal
  );
  const resolutionState = useSelector(
    (state: RootState) => state.window.resolution
  );
  const publishersModalState = useSelector(
    (state: RootState) => state.window.publishersModal
  );
  const platformsModalState = useSelector(
    (state: RootState) => state.window.platformsModal
  );
  const genresModalState = useSelector(
    (state: RootState) => state.window.genresModal
  );
  const storesModalState = useSelector(
    (state: RootState) => state.window.storesModal
  );
  const sortModalState = useSelector(
    (state: RootState) => state.window.sortModal
  );
  const sortAndFilterModalState = useSelector(
    (state: RootState) => state.window.sortAndFilterModal
  );
  const twoFactorModalState = useSelector(
    (state: RootState) => state.window.twoFactorModal
  );
  const sortMenuState = useSelector(
    (state: RootState) => state.window.sortMenu
  );
  const priceMenuState = useSelector(
    (state: RootState) => state.window.priceMenu
  );
  const publishersMenuState = useSelector(
    (state: RootState) => state.window.publishersMenu
  );
  const platformsMenuState = useSelector(
    (state: RootState) => state.window.platformsMenu
  );
  const genresMenuState = useSelector(
    (state: RootState) => state.window.genresMenu
  );
  const storesMenuState = useSelector(
    (state: RootState) => state.window.storesMenu
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
