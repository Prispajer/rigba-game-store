import React from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import fetchService from "@/utils/classes/fetchService";
import useFetchGameData from "@/hooks/useFetchGameData";
import { setGenresIdArray } from "@/redux/slices/gamesFilterSlice";
import UtilsService from "@/utils/classes/utilsService";
import IUtilsService from "@/utils/interfaces/iUtilsService";
import useSearchText from "@/hooks/useSearchText";

export default function FilterByGenre() {
  const { gamesFilterState, handleFilterChange } = useFetchGameData();
  const { handleSetSearchText, searchGenreTextState } = useSearchText();
  const [gameGenres, setGameGenres] = React.useState<any[]>([]);
  const utilsService: IUtilsService = new UtilsService(
    searchGenreTextState as string
  );

  React.useEffect(() => {
    (async () => {
      setGameGenres(await fetchService.getGamesGenres(10));
    })();
  }, []);

  return (
    <div className="py-[15px] px-[20px] text-[#ffffff] text-[16px] leading-[19px] border-b-[2px] border-b-primaryColor">
      <div className="flex items-center justify-between max-w-[300px] pb-[10px] cursor-pointer">
        <span>Gatunek</span>
        <MdKeyboardArrowUp size="25px" />
      </div>
      <div className="flex items-center flex-1 p-[8px] mb-[10px] border-[white] bg-secondaryColor">
        <FaSearch size="25px" color="white" className="mr-3" />
        <input
          className="text-[white] border-none outline-none bg-transparent w-[100%]"
          onChange={(event) => handleSetSearchText("searchGenreText", event)}
          type="text"
          name="text"
          autoComplete="off"
        />
      </div>
      <div className="flex items-center">
        <ul>
          {utilsService.searchByString(gameGenres).map((genre) => (
            <li
              key={genre.id}
              className="flex justify-between items-center mb-[10px]"
            >
              <input
                className="flex-0"
                type="checkbox"
                checked={gamesFilterState.genresIdArray.includes(genre.id)}
                onChange={() =>
                  handleFilterChange(
                    genre.id,
                    gamesFilterState.genresIdArray,
                    setGenresIdArray
                  )
                }
              />
              <span className="flex-1 px-[10px] font-[600]">{genre.name}</span>
              <span className="flex-0 text-[#ffffffB3] text-end">
                {genre.games_count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
