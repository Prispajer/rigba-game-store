import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  increaseQuantity,
  decreaseQuantity,
} from "@/redux/slices/productSlice";
import { RootState } from "../redux/store";
import { LocalProduct } from "@/utils/helpers/types";

export default function useLocalStorage(key: string) {
  const localCartState = useSelector(
    (state: RootState) => state.product.localCart
  );
  const dispatch = useDispatch();

  const handleAddProduct = (product: LocalProduct): void => {
    dispatch(addProduct(product));
  };
  const handleIncreaseQuantity = (product: number): void => {
    dispatch(increaseQuantity(product));
  };
  const handleDecreaseQuantity = (product: number): void => {
    dispatch(decreaseQuantity(product));
  };

  // const setItem = (cart: LocalProduct[]) =>
  //   localStorage.setItem(key, JSON.stringify(cart));

  // const getItem = (): Product[] | undefined => {
  //   try {
  //     const product = localStorage.getItem(key);
  //     return product ? JSON.parse(product) : undefined;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const removeItem = () => {
  //   try {
  //     localStorage.removeItem(key);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const removeProduct = (productId: number) => {
  //   const updatedCart = currentCart.filter((item) => item.id !== productId);
  //   setItem(updatedCart);
  // };

  return {
    localCartState,
    handleAddProduct,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
}
