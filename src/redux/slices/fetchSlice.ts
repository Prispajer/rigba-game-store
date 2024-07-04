import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetchService from "@/utils/classes/fetchService";
import { GameAPIResponse } from "@/utils/helpers/types";

interface FetchState {
  data: GameAPIResponse[];
  isLoading: boolean;
  error: string | null;
  page: number;
  count: number;
  nextUrl: string | null;
  previousUrl: string | null;
}

const initialState: FetchState = {
  data: [],
  isLoading: false,
  error: null,
  page: 1,
  count: 0,
  nextUrl: null,
  previousUrl: null,
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
      return rejectWithValue((error as Error).message);
    }
  }
);

const fetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{
        page: number;
        nextUrl: string | null;
        previousUrl: string | null;
      }>
    ) => {
      const { page, nextUrl, previousUrl } = action.payload;
      state.page = page;
      state.nextUrl = nextUrl;
      state.previousUrl = previousUrl;
    },
    setNextPage: (state) => {
      state.page += 1;
    },
    setPreviousPage: (state) => {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesByTagsId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchGamesByTagsId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload.results;
          state.count = action.payload.count;
          state.nextUrl = action.payload.next;
          state.previousUrl = action.payload.previous;
        }
      )
      .addCase(fetchGamesByTagsId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, setNextPage, setPreviousPage } = fetchSlice.actions;
export default fetchSlice.reducer;
