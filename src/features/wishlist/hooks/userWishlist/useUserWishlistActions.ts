"use client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  addUserProductToWishlistThunk,
  deleteUserProductFromWishlistThunk,
} from "./../../redux/slices/userWishlist/userWishlist.thunk";
import useCurrentUser from "../../../user/hooks/useCurrentUser";
import useAsyncActionWithLoading from "@/hooks/useAsyncActionWithLoading";
import { setLocalStorageWishlistOrdering } from "../../redux/slices/localStorageWishlist/localStorageWishlistSlice";
import debounce from "@/utils/debounce";
import AddUserProductToWishListDTO from "../../dto/AddUserProductToWishListDTO";

export default function useUserWishlistActions() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useCurrentUser();
  const { isLoading, executeWithLoading } = useAsyncActionWithLoading();

  const handleAddUserProductToWishlist = debounce(
    (addUserProductToWishListDTO: AddUserProductToWishListDTO) => {
      if (user?.email) {
        executeWithLoading("addUserProductToWishlist", () =>
          dispatch(addUserProductToWishlistThunk(addUserProductToWishListDTO))
        );
      }
    },
    200
  );

  const handleDeleteUserProductFromWishlist = debounce(
    (email: string, externalProductId: number) => {
      if (user?.email) {
        executeWithLoading("deleteUserProductFromWishlist", () =>
          dispatch(
            deleteUserProductFromWishlistThunk({
              email,
              externalProductId,
            })
          )
        );
      }
    },
    200
  );

  const handleSetUserWishlistOrdering = (ordering: string) => {
    dispatch(setLocalStorageWishlistOrdering(ordering));
  };

  return {
    isLoading,
    handleAddUserProductToWishlist,
    handleDeleteUserProductFromWishlist,
    handleSetUserWishlistOrdering,
  };
}
