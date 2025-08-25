import { RootState } from "@/redux/store";

export const selectLocalStorageCartState = (state: RootState) =>
  state.localStorageCart;
