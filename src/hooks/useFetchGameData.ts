import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchGamesByGenresId,
  setGenresId,
  setPlatformsId,
  setStoresId,
  setPublishersId,
  setPage,
  setNextPage,
  setPreviousPage,
} from "@/redux/slices/productFetchAndFilterSlice";

export default function useFetchGameData() {
  const dispatch = useDispatch<AppDispatch>();
  const productFetchAndFilterState = useSelector(
    (state: RootState) => state.productFetchAndFilter
  );

  const handleFetchGamesByGenresId = (page: number) => {
    dispatch(fetchGamesByGenresId({ page }));
  };

  const handleSetPage = (page: number) => {
    if (page > 0 && page <= 20) {
      dispatch(setPage({ page }));
    }
  };

  const handleGenreFilterChange = (genreId: number) => {
    const updatedFilters = productFetchAndFilterState.genresId.includes(genreId)
      ? productFetchAndFilterState.genresId.filter((id) => id !== genreId)
      : [...productFetchAndFilterState.genresId, genreId];

    dispatch(setGenresId(updatedFilters));
  };

  const handleSetTagsId = (tagsId: number[]) => {
    dispatch(setGenresId(tagsId));
  };

  const handleSetPlatformsId = (platformsId: number[]) => {
    dispatch(setPlatformsId(platformsId));
  };

  const handleSetStoresId = (storesId: number[]) => {
    dispatch(setStoresId(storesId));
  };

  const handleSetPublishersId = (publishersId: number[]) => {
    dispatch(setPublishersId(publishersId));
  };

  const handleSetNextPage = () => {
    if (productFetchAndFilterState.page < 20) {
      dispatch(setNextPage());
    }
  };

  const handleSetPreviousPage = () => {
    if (productFetchAndFilterState.page > 1) {
      dispatch(setPreviousPage());
    }
  };

  return {
    productFetchAndFilterState,
    handleFetchGamesByGenresId,
    handleGenreFilterChange,
    handleSetPlatformsId,
    handleSetStoresId,
    handleSetPublishersId,
    handleSetPage,
    handleSetTagsId,
    handleSetNextPage,
    handleSetPreviousPage,
  };
}
