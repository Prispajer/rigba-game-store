import { useDispatch, useSelector } from "react-redux";
import { open, close } from "@/redux/slices/utilitySlice";
import { RootState } from "../store";
import { Root } from "postcss";

export default function useSharedGeneralActions() {
  const userSidebarState = useSelector(
    (state: RootState) => state.utility.userSidebar
  );
  const myCartState = useSelector((state: RootState) => state.utility.myCart);
  const navSidebarCategoryState = useSelector(
    (state: RootState) => state.utility.navSidebarCategory
  );
  const searchSidebarState = useSelector(
    (state: RootState) => state.utility.searchSidebar
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
    myCartState,
    navSidebarCategoryState,
    searchSidebarState,
    handleOpen,
    handleClose,
  };
}
