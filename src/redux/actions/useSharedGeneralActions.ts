import { useDispatch, useSelector } from "react-redux";
import { openSidebar, closeSidebar } from "@/redux/slices/utilitySlice";
import { RootState } from "../store";

export default function useSharedGeneralActions() {
  const userSidebarState = useSelector(
    (state: RootState) => state.utility.userSidebar
  );
  const myCartState = useSelector((state: RootState) => state.utility.myCart);
  const navSidebarState = useSelector(
    (state: RootState) => state.utility.navSidebar
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
    handleOpenSidebar,
    handleCloseSidebar,
  };
}
