import fetchService from "@/utils/classes/fetchService";
import createExternalResourceSlice from "./createExternalResourceSlice";

const genresSlice = createExternalResourceSlice(
  "genres",
  fetchService.getGamesGenres
);
export const fetchGenres = genresSlice.fetchResources;
export const genresReducer = genresSlice.reducer;

export default genresReducer;
