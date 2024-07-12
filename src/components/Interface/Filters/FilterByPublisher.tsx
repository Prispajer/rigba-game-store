import React from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import fetchService from "@/utils/classes/fetchService";
import useFetchGameData from "@/hooks/useFetchGameData";
import { setPublishersIdArray } from "@/redux/slices/gamesFilterSlice";
import useSearchText from "@/hooks/useSearchText";
import UtilsService from "@/utils/classes/utilsService";
import IUtilsService from "@/utils/interfaces/iUtilsService";

export default function FilterByType() {
  const { gamesFilterState, handleFilterChange } = useFetchGameData();
  const { handleSetSearchText, searchPublisherTextState } = useSearchText();
  const [gamePublishers, setGamePublishers] = React.useState<any[]>([]);
  const utilsService: IUtilsService = new UtilsService(
    searchPublisherTextState as string
  );

  React.useEffect(() => {
    (async () => {
      setGamePublishers(await fetchService.getGamesTypes(1));
    })();
  }, []);

  return (
    <>
      <div className="py-[15px] px-[20px] text-[#ffffff] text-[16px]  border-b-[2px] border-b-primaryColor">
        <div className="flex items-center justify-between max-w-[300px] pb-[10px] cursor-pointer">
          <span>Publisher</span>
          <MdKeyboardArrowUp size="25px" />
        </div>
        <div className="flex items-center  flex-1 p-[8px] mb-[10px] border-[white]   bg-secondaryColor ">
          <FaSearch size="25px" color="white" className="mr-3" />
          <input
            className="text-[white] border-none outline-none bg-transparent w-[100%]"
            onChange={(event) =>
              handleSetSearchText("searchPublisherText", event)
            }
            type="text"
            name="text"
            autoComplete="off"
          />
        </div>
        <div className="flex items-center">
          <ul className="w-full">
            {utilsService.searchByString(gamePublishers).map((publisher) => (
              <li
                key={publisher.id}
                className="flex justify-between items-center mb-[10px]"
              >
                <input
                  className="flex-0"
                  type="checkbox"
                  checked={gamesFilterState.publishersIdArray.includes(
                    publisher.id
                  )}
                  onClick={() =>
                    handleFilterChange(
                      publisher.id,
                      gamesFilterState.publishersIdArray,
                      setPublishersIdArray
                    )
                  }
                />
                <span className="flex-1 px-[10px] font-[600]">
                  {publisher.name}
                </span>
                <span className="flex-0 text-[#ffffffB3] text-end">
                  {publisher.games_count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
