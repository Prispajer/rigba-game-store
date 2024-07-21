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
  const imageModalState = useSelector(
    (state: RootState) => state.utility.gameImageModal
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
    imageModalState,
    resolutionState,
    publishersModalState,
    platformsModalState,
    genresModalState,
    storesModalState,
    sortModalState,
    handleOpen,
    handleClose,
    handleToggle,
    handleToggleScreen,
  };
}
