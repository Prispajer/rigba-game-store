import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchGamesByTagsId,
  setPage,
  setNextPage,
  setPreviousPage,
} from "@/redux/slices/fetchSlice";

export default function useFetchGameData() {
  const dispatch = useDispatch<AppDispatch>();
  const fetchSlice = useSelector((state: RootState) => state.fetch);

  const handleFetchGamesByTagsId = (tagsId: number[], page: number) => {
    dispatch(fetchGamesByTagsId({ tagsId, page }));
  };

  const handleSetPage = (page: number) => {
    if (page > 0 && page <= 20) {
      dispatch(setPage({ page }));
    }
  };

  const handleSetNextPage = () => {
    if (fetchSlice.page < 20) {
      dispatch(setNextPage());
    }
  };

  const handleSetPreviousPage = () => {
    if (fetchSlice.page > 1) {
      dispatch(setPreviousPage());
    }
  };

  return {
    fetchSlice,
    handleFetchGamesByTagsId,
    handleSetPage,
    handleSetNextPage,
    handleSetPreviousPage,
  };
}
