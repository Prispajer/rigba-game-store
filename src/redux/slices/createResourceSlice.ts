import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GameAPIResponse } from "@/utils/helpers/types";
import fetchService from "@/utils/classes/fetchService";

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

const createResourceSlice = (
  name: string,
  fetchFunction: (quantity: number) => Promise<GameAPIResponse[]>
) => {
  const fetchResource = createAsyncThunk<
    GameAPIResponse[],
    { quantity: number },
    { rejectValue: string }
  >(
    `${name}/fetch${name.charAt(0).toUpperCase() + name.slice(1)}`,
    async ({ quantity = 1 }, { rejectWithValue }) => {
      try {
        const response = await fetchFunction(quantity);
        return response;
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
        .addCase(fetchResource.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchResource.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        })
        .addCase(fetchResource.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string | null;
        });
    },
  });

  return {
    reducer: slice.reducer,
    fetchResource,
  };
};

export default createResourceSlice;
