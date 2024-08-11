import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { open, close, toggleScreen, toggle } from "@/redux/slices/utilitySlice";
import { RootState } from "../redux/store";

export default function useWindowVisibility() {
  const dispatch = useDispatch();

  const authSidebarState = useSelector(
    (state: RootState) => state.utility.authSidebar
  );
  const profileModalState = useSelector(
    (state: RootState) => state.utility.profileModal
  );
  const cartModalState = useSelector(
    (state: RootState) => state.utility.cartModal
  );
  const navSidebarState = useSelector(
    (state: RootState) => state.utility.navSidebar
  );
  const searchBarState = useSelector(
    (state: RootState) => state.utility.searchBarModal
  );
  const gameScreenshotModalState = useSelector(
    (state: RootState) => state.utility.gameScreenshotModal
  );
  const resolutionState = useSelector(
    (state: RootState) => state.utility.resolution
  );
  const publishersModalState = useSelector(
    (state: RootState) => state.utility.publishersModal
  );
  const platformsModalState = useSelector(
    (state: RootState) => state.utility.platformsModal
  );
  const genresModalState = useSelector(
    (state: RootState) => state.utility.genresModal
  );
  const storesModalState = useSelector(
    (state: RootState) => state.utility.storesModal
  );
  const sortModalState = useSelector(
    (state: RootState) => state.utility.sortModal
  );
  const sortAndFilterModalState = useSelector(
    (state: RootState) => state.utility.sortAndFilterModal
  );
  const sortMenuState = useSelector(
    (state: RootState) => state.utility.sortMenu
  );
  const priceMenuState = useSelector(
    (state: RootState) => state.utility.priceMenu
  );
  const publishersMenuState = useSelector(
    (state: RootState) => state.utility.publishersMenu
  );
  const platformsMenuState = useSelector(
    (state: RootState) => state.utility.platformsMenu
  );
  const genresMenuState = useSelector(
    (state: RootState) => state.utility.genresMenu
  );
  const storesMenuState = useSelector(
    (state: RootState) => state.utility.storesMenu
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
    gameScreenshotModalState,
    resolutionState,
    publishersModalState,
    platformsModalState,
    genresModalState,
    storesModalState,
    sortModalState,
    sortAndFilterModalState,
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
