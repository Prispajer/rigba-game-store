import fetchService from "@/utils/classes/fetchService";
import createExternalResourceSlice from "./createExternalResourceSlice";

const storesSlice = createExternalResourceSlice(
  "stores",
  fetchService.getGamesStores
);
export const fetchStores = storesSlice.fetchResources;
export const storesReducer = storesSlice.reducer;

export default storesReducer;
