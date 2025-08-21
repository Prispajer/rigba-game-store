import { RootState } from "@/redux/store";

export const selectLocalStorageCart = (state: RootState) =>
  state.localStorageCart;
