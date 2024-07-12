import React, { useState, useCallback, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import UtilsService from "@/utils/classes/utilsService";
import IUtilsService from "@/utils/interfaces/iUtilsService";
import SearchResultsContainer from "./SearchResultsContainer";
import debounce from "@/utils/debounce";
import fetchService from "@/utils/classes/fetchService";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import { SearchData } from "@/utils/helpers/types";

export default function SearchBar() {
  const { searchBarState, resolutionState, handleClose, handleToggle } =
    useWindowVisibility();

  const [searchText, setSearchText] = useState("");
  const [games, setGames] = useState<SearchData[]>([]);
  const utilsService: IUtilsService = new UtilsService(searchText.trim());

  const getGames = useCallback(async (searchText: string) => {
    try {
      if (searchText.trim() !== "") {
        const gamesData = await fetchService.getGames(searchText);
        setGames(gamesData);
      } else {
        setGames([]);
      }
    } catch (error) {
      console.error(
        "An problem has occurred while fetching games data!",
        error
      );
    }
  }, []);

  useEffect(() => {
    if (searchText.trim() !== "") {
      getGames(searchText);
    } else {
      setGames([]);
    }
  }, [searchText]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    utilsService.setSearchText(value);
    setSearchText(value);
  };

  const filteredGames = utilsService.searchByString(games);

  const handleOutsideClick = () => {
    handleToggle("searchBarModal");
  };

  return (
    <div className="flex-1">
      {searchBarState && !resolutionState && (
        <div className="fixed top-0 right-0 bottom-0 h-full w-full z-10 bg-primaryColor">
          <div className="flex items-center gap-y-[10px] py-[20px] bg-primaryColor font-medium border-b-secondaryColor border-b-2">
            <FaSearch size="30px" color="white" className="mx-2" />
            <input
              className="text-[white] border-none outline-none bg-transparent w-[100%]"
              type="text"
              name="text"
              onChange={debounce(handleChange, 1000)}
              placeholder="Szukaj"
              autoComplete="off"
            />
            <IoCloseSharp
              size="30px"
              color="white"
              className="mx-2"
              onClick={() => handleClose("searchBarModal")}
            />
          </div>
          <SearchResultsContainer filteredGames={filteredGames} />
        </div>
      )}
      {searchBarState ? (
        <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
          <div className="relative hidden md:flex items-center flex-1 p-[20px] border-[white] border-[2px] z-20">
            <FaSearch size="25px" color="white" className="mr-3" />
            <input
              className="text-[white] border-none outline-none bg-transparent w-[100%] z-20"
              onChange={debounce(handleChange, 1000)}
              type="text"
              name="text"
              placeholder="Szukaj"
              autoComplete="off"
            />
            {searchBarState && (
              <IoCloseSharp
                size="25px"
                color="white"
                className="cursor-pointer"
                onClick={() => handleToggle("searchBarModal")}
              />
            )}
            {searchBarState && (
              <SearchResultsContainer filteredGames={filteredGames} />
            )}
          </div>
        </OutsideClickHandler>
      ) : (
        <div className="relative hidden md:flex items-center flex-1 p-[20px] border-[white] border-[2px] bg-transparent">
          <FaSearch size="25px" color="white" className="mr-3" />
          <input
            className="text-[white] border-none outline-none bg-transparent w-[100%]"
            onChange={debounce(handleChange, 1000)}
            onFocus={handleOutsideClick}
            type="text"
            name="text"
            placeholder="Szukaj"
            autoComplete="off"
          />
        </div>
      )}
    </div>
  );
}
