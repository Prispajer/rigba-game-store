import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Data = {
  isLoading: boolean;
  data: [] | null;
  error: boolean;
};

const initialState: Data = {
  isLoading: false,
  data: null,
  error: false,
};

export const fetchData = createAsyncThunk("fetchData", async () => {
  const data = await fetch("");
});

const fetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {},
});

export const {} = fetchSlice.actions;
export default fetchSlice.reducer;
