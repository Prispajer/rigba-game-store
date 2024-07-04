import { useDispatch, useSelector } from "react-redux";
import {
  fetchGamesByTagsId,
  setNextPage,
  setPreviousPage,
  setPage,
} from "@/redux/slices/fetchSlice";
import { RootState, AppDispatch } from "../redux/store";

export default function useFetchGameData() {
  const fetchSlice = useSelector((state: RootState) => state.fetch);
  const dispatch = useDispatch<AppDispatch>();

  const handleFetchDataByTagsId = (tagId: string, page: number) => {
    dispatch(fetchGamesByTagsId({ tagId, page }));
  };

  const handleSetNextPage = () => {
    dispatch(setNextPage());
  };

  const handleSetPreviousPage = () => {
    dispatch(setPreviousPage());
  };

  const handleSetPage = (page: number) => {
    const nextUrl = fetchSlice.nextUrl || null;
    const previousUrl = fetchSlice.previousUrl || null;
    dispatch(setPage({ page, nextUrl, previousUrl }));
  };

  return {
    fetchSlice,
    handleFetchDataByTagsId,
    handleSetNextPage,
    handleSetPreviousPage,
    handleSetPage,
  };
}
