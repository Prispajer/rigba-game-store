import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrdering,
  fetchAddUserProductToWishList,
  fetchDeleteUserProductFromWishList,
} from "@/redux/slices/userWishListSlice";
import useCurrentUser from "./useCurrentUser";
import debounce from "@/utils/debounce";
import { fetchUserWishList } from "@/redux/slices/userWishListSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  AddUserProductToWishListDTO,
  DeleteUserProductFromWishListDTO,
} from "@/utils/helpers/frontendDTO";

export default function useUserWishList() {
  const { user, update } = useCurrentUser();
  const dispatch = useDispatch<AppDispatch>();

  const userWishListState = useSelector(
    (state: RootState) => state.userWishList
  );

  const handleAddUserProductToWishList = React.useCallback(
    debounce(
      async (addUserProductToWishListDTO: AddUserProductToWishListDTO) => {
        if (user?.email) {
          await dispatch(
            fetchAddUserProductToWishList(addUserProductToWishListDTO)
          );
          await dispatch(fetchUserWishList({ email: user?.email as string }));
          await update();
        }
      },
      1000
    ),
    [dispatch, user?.email, update]
  );

  const handleDeleteUserProductFromWishList = React.useCallback(
    debounce(
      async (
        deleteUserProductFromWishListDTO: DeleteUserProductFromWishListDTO
      ) => {
        if (user?.email) {
          await dispatch(
            fetchDeleteUserProductFromWishList(deleteUserProductFromWishListDTO)
          );
          await dispatch(fetchUserWishList({ email: user?.email as string }));
          await update();
        }
      },
      1000
    ),
    [dispatch, user?.email, update]
  );

  const handleSetUserWishListOrdering = React.useCallback(
    (ordering: string) => {
      dispatch(setOrdering(ordering));
      dispatch(fetchUserWishList({ email: user?.email as string }));
    },
    [dispatch, user]
  );

  return {
    userWishListState,
    handleAddUserProductToWishList,
    handleDeleteUserProductFromWishList,
    handleSetUserWishListOrdering,
  };
}
