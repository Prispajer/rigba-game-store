"use client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  addUserProductToWishlistThunk,
  deleteUserProductFromWishlistThunk,
} from "./../../redux/slices/userWishlist/userWishlist.thunk";
import useCurrentUser from "../../../user/hooks/useCurrentUser";
import useAsyncActionWithLoading from "@/hooks/useAsyncActionWithLoading";
import debounce from "@/utils/debounce";
import AddUserProductToWishListDTO from "../../dto/AddUserProductToWishListDTO";
import { setUserWishlistOrdering } from "../../redux/slices/userWishlist/userWishlistSlice";

export default function useUserWishlistActions(onRefresh?: () => void) {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useCurrentUser();
  const { isLoading, executeWithLoading } = useAsyncActionWithLoading();

  const handleAddUserProductToWishlist = debounce(
    async (addUserProductToWishListDTO: AddUserProductToWishListDTO) => {
      if (user?.email) {
        await executeWithLoading("addUserProductToWishlist", () =>
          dispatch(addUserProductToWishlistThunk(addUserProductToWishListDTO))
        );
      }
      onRefresh?.();
    },
    200
  );

  const handleDeleteUserProductFromWishlist = debounce(
    async (email: string, externalProductId: number) => {
      if (user?.email) {
        await executeWithLoading("deleteUserProductFromWishlist", () =>
          dispatch(
            deleteUserProductFromWishlistThunk({
              email,
              externalProductId,
            })
          )
        );
      }
      onRefresh?.();
    },
    200
  );

  const handleSetUserWishlistOrdering = (ordering: string) => {
    dispatch(setUserWishlistOrdering(ordering));
    onRefresh?.();
  };

  return {
    isLoading,
    handleAddUserProductToWishlist,
    handleDeleteUserProductFromWishlist,
    handleSetUserWishlistOrdering,
  };
}
