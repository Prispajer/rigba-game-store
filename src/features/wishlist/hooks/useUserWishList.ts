"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrdering,
  fetchAddUserProductToWishList,
  fetchDeleteUserProductFromWishList,
} from "@/features/wishlist/redux/slices/wishlist/wishlistSlice";
import useCurrentUser from "../../user/hooks/useCurrentUser";
import debounce from "@/utils/debounce";
import { fetchUserWishList } from "@/features/wishlist/redux/slices/wishlist/wishlistSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  AddUserProductToWishListDTO,
  DeleteUserProductFromWishListDTO,
} from "@/utils/helpers/frontendDTO";

export default function useUserWishList() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { user } = useCurrentUser();
  const dispatch = useDispatch<AppDispatch>();

  const userWishListState = useSelector(
    (state: RootState) => state.userWishList
  );

  const handleFetchUserWishList = React.useMemo(
    () =>
      debounce(async () => {
        if (user?.email) {
          await dispatch(fetchUserWishList({ email: user.email }));
        }
      }, 200),
    [dispatch, user?.email]
  );

  const handleAddUserProductToWishList = debounce(
    async (addUserProductToWishListDTO: AddUserProductToWishListDTO) => {
      if (user?.email) {
        setIsLoading(true);
        await dispatch(
          fetchAddUserProductToWishList(addUserProductToWishListDTO)
        );
        handleFetchUserWishList();
        setIsLoading(false);
      }
    },
    200
  );

  const handleDeleteUserProductFromWishList = debounce(
    async (
      deleteUserProductFromWishListDTO: DeleteUserProductFromWishListDTO
    ) => {
      if (user?.email) {
        setIsLoading(true);
        await dispatch(
          fetchDeleteUserProductFromWishList(deleteUserProductFromWishListDTO)
        );
        handleFetchUserWishList();
        setIsLoading(false);
      }
    },
    200
  );

  const handleSetUserWishListOrdering = (ordering: string) => {
    dispatch(setOrdering(ordering));
    handleFetchUserWishList();
  };

  return {
    userWishListState,
    isLoading,
    handleAddUserProductToWishList,
    handleDeleteUserProductFromWishList,
    handleSetUserWishListOrdering,
  };
}
