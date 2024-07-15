import fetchService from "@/utils/classes/fetchService";
import createExternalResourceSlice from "./createExternalResourceSlice";

const platformsSlice = createExternalResourceSlice(
  "platforms",
  "fetchPlatforms",
  fetchService.getGamesPlatforms
);
export const fetchPlatforms = platformsSlice.fetchResources;
export const platformsReducer = platformsSlice.reducer;

export default platformsReducer;
