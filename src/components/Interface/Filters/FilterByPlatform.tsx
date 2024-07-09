import React from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import useFetchGameData from "@/hooks/useFetchGameData";
import fetchService from "@/utils/classes/fetchService";

export default function FilterByPlatform({
  handleTagChange,
}: {
  handleTagChange: (id: number) => void;
}) {
  const { productFetchAndFilterState } = useFetchGameData();
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    const getGames = async () => {
      const gamesPlatforms = await fetchService.getGamesPlatforms(4);
      setData(gamesPlatforms);
    };
    getGames();
  }, []);

  console.log(data);
  return (
    <>
      <div className="py-[15px] px-[20px] text-[#ffffff]  text-[16px]  border-b-[2px] border-b-primaryColor">
        <div className="flex items-center justify-between max-w-[300px] pb-[10px] cursor-pointer">
          <span>Platform</span>
          <MdKeyboardArrowUp size="25px" />
        </div>
        <div className="flex items-center  flex-1 p-[8px] mb-[10px] border-[white]   bg-secondaryColor ">
          <FaSearch size="25px" color="white" className="mr-3" />
          <input
            className="text-[white] border-none outline-none bg-transparent w-[100%]"
            type="text"
            name="text"
            autoComplete="off"
          />
        </div>
        <div className="flex items-center">
          <ul className="w-full">
            {data.map((tag) => (
              <li
                key={tag.id}
                className="flex justify-between items-center mb-[10px]"
              >
                <input
                  className="flex-0"
                  type="checkbox"
                  checked={productFetchAndFilterState.platformsId.includes(
                    tag.id
                  )}
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
    </>
  );
}
