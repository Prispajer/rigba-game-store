import { useDispatch, useSelector } from "react-redux";
import { openSidebar, closeSidebar } from "@/redux/slices/utilitySlice";
import { RootState } from "../store";
import { Root } from "postcss";

export default function useSharedGeneralActions() {
  const userSidebarState = useSelector(
    (state: RootState) => state.utility.userSidebar
  );
  const myCartState = useSelector((state: RootState) => state.utility.myCart);
  const navSidebarState = useSelector(
    (state: RootState) => state.utility.navSidebar
  );
  const searchSidebarState = useSelector(
    (state: RootState) => state.utility.searchSidebar
  );

  const dispatch = useDispatch();
  const handleOpenSidebar = (element: string) => {
    dispatch(openSidebar(element));
  };
  const handleCloseSidebar = (element: string) => {
    dispatch(closeSidebar(element));
  };

  return {
    userSidebarState,
    myCartState,
    navSidebarState,
    searchSidebarState,
    handleOpenSidebar,
    handleCloseSidebar,
  };
}
