import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetchService from "@/utils/classes/fetchService";
import { GameAPIResponse } from "@/utils/helpers/types";

interface FetchState {
  data: GameAPIResponse[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FetchState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchGamesByTagsId = createAsyncThunk(
  "fetch/fetchGamesByTagsId",
  async (
    { tagId, page }: { tagId: string; page: number },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchService.getGamesByTagsId(tagId, page);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesByTagsId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchGamesByTagsId.fulfilled,
        (state, action: PayloadAction<GameAPIResponse[]>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchGamesByTagsId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default fetchSlice.reducer;
