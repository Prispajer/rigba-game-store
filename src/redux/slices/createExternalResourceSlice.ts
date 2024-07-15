import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GameAPIResponse } from "@/utils/helpers/types";

interface ResourceState {
  data: GameAPIResponse[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ResourceState = {
  data: [],
  isLoading: false,
  error: null,
};

const createExternalResourceSlice = (
  name: string,
  fetchName: string,
  fetchFunction: (page: number) => Promise<GameAPIResponse[]>
) => {
  const fetchResources = createAsyncThunk<
    GameAPIResponse[],
    { page: number },
    { rejectValue: string }
  >(
    `${name}/${fetchName}`,
    async ({ page = 1 }: { page: number }, { rejectWithValue }) => {
      try {
        const externalResource = await fetchFunction(page);
        return externalResource;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    }
  );

  const slice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchResources.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchResources.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        })
        .addCase(fetchResources.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string | null;
        });
    },
  });

  return {
    reducer: slice.reducer,
    actions: slice.actions,
    fetchResources,
  };
};

export default createExternalResourceSlice;
