import React from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import fetchService from "@/utils/classes/fetchService";
import useFetchGameData from "@/hooks/useFetchGameData";

export default function FilterByGenre({
  handleTagChange,
}: {
  handleTagChange: (genreId: number) => void;
}) {
  const { productFetchAndFilterState, handleGenreFilterChange } =
    useFetchGameData();
  const [data, setData] = React.useState<any[]>([]);
  console.log(data);
  console.log(productFetchAndFilterState);

  React.useEffect(() => {
    const getGames = async () => {
      const gamesGenres = await fetchService.getGamesGenres(1);
      setData(gamesGenres);
    };
    getGames();
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
          type="text"
          name="text"
          autoComplete="off"
        />
      </div>
      <div className="flex items-center">
        <ul>
          {data.map((tag) => (
            <li
              key={tag.id}
              className="flex justify-between items-center mb-[10px]"
            >
              <input
                className="flex-0"
                type="checkbox"
                checked={productFetchAndFilterState.genresId.includes(tag.id)}
                onChange={() => handleTagChange(tag.id)}
              />
              <span className="flex-1 px-[10px] font-[600]">{tag.name}</span>
              <span className="flex-0 text-[#ffffffB3] text-end">
                {tag.games_count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
