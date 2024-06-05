"use client";
import { useDispatch, useSelector } from "react-redux";
import { open, close, toggleScreen, toggle } from "@/redux/slices/utilitySlice";
import { RootState } from "../redux/store";

export default function useWindowVisibility() {
  const userSidebarState = useSelector(
    (state: RootState) => state.utility.userSidebar
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
  const mobileSearchModalState = useSelector(
    (state: RootState) => state.utility.mobileSearchModal
  );
  const gameImageModalState = useSelector(
    (state: RootState) => state.utility.gameImageModal
  );
  const resolutionState = useSelector(
    (state: RootState) => state.utility.resolution
  );
  const desktopSearchBarState = useSelector(
    (state: RootState) => state.utility.desktopSearchBar
  );

  const dispatch = useDispatch();
  const handleOpen = (element: string) => {
    dispatch(open(element));
  };
  const handleClose = (element: string) => {
    dispatch(close(element));
  };
  const handleToggle = (element: string) => {
    dispatch(toggle(element));
  };
  const handleToggleScreen = (resolution: number) => {
    return () => {
      const windowScreen = window.innerWidth > resolution;
      dispatch(toggleScreen(windowScreen));
    };
  };

  return {
    userSidebarState,
    profileModalState,
    cartModalState,
    navSidebarState,
    mobileSearchModalState,
    gameImageModalState,
    resolutionState,
    desktopSearchBarState,
    handleOpen,
    handleClose,
    handleToggle,
    handleToggleScreen,
  };
}
