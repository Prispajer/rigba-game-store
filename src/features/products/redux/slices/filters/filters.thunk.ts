import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchService from "@/services/FetchService";
import { assignPricesToExternalGames } from "@/features/products/utils/prices";
import ApiPagination from "@/features/products/types/api/apiPagination";
import { FiltersState } from "./filters.types";

export const getProductsWithFilters = createAsyncThunk<
    ApiPagination,
  { page: number },
  { rejectValue: string; getState: () => FiltersState }
>(
  "productFilter/fetchProductsWithFilters",
  async ({ page = 1 }, { rejectWithValue, getState }) => {
    const {
      productsWithFilters,
      genresIdArray,
      platformsIdArray,
      storesIdArray,
      publishersIdArray,
      ordering,
    } = (getState() as { productFilter: FiltersState }).productFilter;

    try {
      const getProductsWithFilters = await fetchService.getProductsWithFilters(
        genresIdArray,
        page,
        platformsIdArray,
        storesIdArray,
        publishersIdArray,
        ordering
      );

      const gamesWithPrices = await assignPricesToExternalGames(
        getProductsWithFilters.results,
        productsWithFilters
      );

      if (ordering === "price") {
        gamesWithPrices.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      } else if (ordering === "-price") {
        gamesWithPrices.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      }

      return {
        ...getProductsWithFilters,
        results: gamesWithPrices,
        count: getProductsWithFilters.count,
        next: getProductsWithFilters.next,
        previous: getProductsWithFilters.previous,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);
