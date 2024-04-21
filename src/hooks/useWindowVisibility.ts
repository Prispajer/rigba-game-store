import { useDispatch, useSelector } from "react-redux";
import { open, close } from "@/redux/slices/utilitySlice";
import { RootState } from "../redux/store";
import { use } from "react";

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
  const searchSidebarState = useSelector(
    (state: RootState) => state.utility.searchSidebar
  );
  const gameImageModalState = useSelector(
    (state: RootState) => state.utility.gameImageModal
  );

  const dispatch = useDispatch();
  const handleOpen = (element: string) => {
    dispatch(open(element));
  };
  const handleClose = (element: string) => {
    dispatch(close(element));
  };

  return {
    userSidebarState,
    profileModalState,
    cartModalState,
    navSidebarState,
    searchSidebarState,
    gameImageModalState,
    handleOpen,
    handleClose,
  };
}
