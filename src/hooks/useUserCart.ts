import React from "react";
import useCurrentUser from "./useCurrentUser";
import {
  fetchUserCart,
  fetchAddUserProductToCart,
  fetchDeleteUserProductFromCart,
  fetchDecreaseQuantityUserProductFromCart,
  fetchIncreaseQuantityUserProductFromCart,
  setProducts,
} from "@/redux/slices/userCartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { generateRandomValue } from "@/utils/prices";
import debounce from "@/utils/debounce";

export default function useUserCart() {
  const { user, update } = useCurrentUser();
  const dispatch = useDispatch<AppDispatch>();
  const userCartState = useSelector((state: RootState) => state.userCart);

  const handleFetchUserCart = React.useCallback(async () => {
    if (user?.email) {
      await dispatch(fetchUserCart({ email: user.email }));
    }
  }, [dispatch, user?.email]);

  const handleAddUserProductToCart = React.useCallback(
    debounce(
      async (
        productId: string,
        productName: string,
        productDescription: string,
        image: string,
        rating: number,
        slug: string
      ) => {
        if (user?.email) {
          await dispatch(
            fetchAddUserProductToCart({
              email: user.email,
              externalProductId: productId,
              name: productName,
              description: productDescription,
              price: generateRandomValue(),
              background_image: image,
              rating,
              slug,
            })
          );
        }
        update();
      },
      1000
    ),
    [dispatch, user?.email, update]
  );

  const handleDeleteUserProductFromCart = React.useCallback(
    debounce(async (externalProductId: number) => {
      if (user?.email) {
        await dispatch(
          fetchDeleteUserProductFromCart({
            email: user.email,
            externalProductId,
          })
        );
      }
      update();
    }, 1000),
    [dispatch, user?.email, update]
  );

  const handleIncreaseQuantityUserProductFromCart = React.useCallback(
    debounce(async (externalProductId: number) => {
      if (user?.email) {
        await dispatch(
          fetchIncreaseQuantityUserProductFromCart({
            email: user.email,
            externalProductId,
          })
        );
      }
      update();
    }, 1000),
    [dispatch, user?.email, update]
  );

  const handleDecreaseQuantityUserProductFromCart = React.useCallback(
    debounce(async (externalProductId: number) => {
      if (user?.email) {
        await dispatch(
          fetchDecreaseQuantityUserProductFromCart({
            email: user.email,
            externalProductId,
          })
        );
      }
      update();
    }, 1000),
    [dispatch, user?.email, update]
  );

  React.useEffect(() => {
    handleFetchUserCart();
  }, [handleFetchUserCart]);

  return {
    userCartState,
    handleFetchUserCart,
    handleAddUserProductToCart,
    handleDeleteUserProductFromCart,
    handleIncreaseQuantityUserProductFromCart,
    handleDecreaseQuantityUserProductFromCart,
  };
}
