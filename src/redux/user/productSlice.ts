import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Product = {
  id: number | undefined;
  name: string | undefined;
  price: number | undefined;
  genres: string | undefined;
  platform: string | undefined;
};

const initialState: Product = {
  id: undefined,
  name: undefined,
  price: undefined,
  genres: undefined,
  platform: undefined,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    createProduct: (state, action: PayloadAction<Product>) => {
      const { id, name, price, genres, platform } = action.payload;
      return { ...state, id, name, price, genres, platform };
    },
  },
});

export const { createProduct } = productSlice.actions;
export default productSlice.reducer;
