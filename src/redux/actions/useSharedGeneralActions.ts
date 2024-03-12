import { useDispatch, useSelector } from "react-redux";
import { openSidebar, closeSidebar } from "@/redux/slices/utilitySlice";
import { RootState } from "../store";

export default function useSharedGeneralActions() {
  const utilityState = useSelector(
    (state: RootState) => state.utility.isSidebarOpen
  );
  const dispatch = useDispatch();
  const useOpenSidebar = () => dispatch(openSidebar());
  const useCloseSidebar = () => dispatch(closeSidebar());

  return { utilityState, useOpenSidebar, useCloseSidebar };
}
