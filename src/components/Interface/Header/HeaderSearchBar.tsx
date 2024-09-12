import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import SearchResultsModalContainer from "../Shared/Modals/SearchResultsModalContainer";
import OutsideClickHandler from "../Shared/Backdrop/OutsideCLickHandler";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import FetchService from "@/utils/services/FetchService";
import UtilsService from "@/utils/services/UtilsService";
import IUtilsService from "@/utils/serverInterfaces/IUtilsService";
import debounce from "@/utils/debounce";
import { GameAPIResponse } from "@/utils/helpers/types";

export default function HeaderSearchBar() {
  const [searchText, setSearchText] = React.useState("");
  const [gamesArray, setGamesArray] = React.useState<GameAPIResponse[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const { searchBarState, resolutionState, handleClose, handleToggle } =
    useWindowVisibility();

  const utilsService: IUtilsService = new UtilsService(searchText.trim());

  const fetchGames = React.useCallback(async (searchText: string) => {
    setIsLoading(true);
    if (searchText.trim() !== "") {
      setGamesArray(await FetchService.getProducts(searchText));
    } else {
      setGamesArray([]);
    }
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    if (searchText.trim() !== "") {
      fetchGames(searchText);
    } else {
      setGamesArray([]);
    }
  }, [searchText]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    utilsService.setSearchText(value);
    setSearchText(value);
  };

  const handleOutsideClick = () => {
    handleToggle("searchBarModal");
    setSearchText("");
    setGamesArray([]);
  };

  return (
    <div
      className={`flex-1 ${
        searchBarState
          ? "absolute w-[100%] bg-primaryColor px-[20px] z-[10] xl:static xl:px-0"
          : "flex-1"
      }`}
    >
      {searchBarState && !resolutionState && (
        <div className="fixed top-0 right-0 bottom-0 h-full w-full z-10 bg-primaryColor overflow-scroll">
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
          {searchText && (
            <SearchResultsModalContainer
              gamesArray={gamesArray}
              loadingState={isLoading}
            />
          )}
        </div>
      )}
      {searchBarState && resolutionState ? (
        <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
          <div className="relative hidden md:flex items-center flex-1 p-[20px] border-[white] border-[2px] z-20">
            <FaSearch size="25px" color="white" className="mr-3" />
            <input
              className="text-[white] border-none outline-none bg-transparent w-[100%]"
              type="text"
              name="text"
              onChange={debounce(handleChange, 1000)}
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
            {searchText && (
              <SearchResultsModalContainer
                gamesArray={gamesArray}
                loadingState={isLoading}
              />
            )}
          </div>
        </OutsideClickHandler>
      ) : (
        <div className="relative hidden md:flex items-center flex-1 p-[20px] border-[white] border-[2px] bg-transparent ">
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
