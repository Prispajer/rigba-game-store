import React, { ChangeEvent } from "react";
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
  const {
    mobileSearchModalState,
    resolutionState,
    handleClose: handleCloseMobileSearchModal,
    desktopSearchBarState,
    handleToggle: handleToggleDesktopSearchBar,
  } = useWindowVisibility();

  const [searchText, setSearchText] = React.useState("");
  const [games, setGames] = React.useState<SearchData[]>([]);
  const utilsService: IUtilsService = new UtilsService(searchText);

  const getGames = async () => {
    try {
      const gamesData = await fetchService.getGames();
      setGames(gamesData);
    } catch (error) {
      console.error(
        "An problem has occurred while fetching games data!",
        error
      );
    }
  };

  React.useEffect(() => {
    getGames();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    utilsService.setSearchText(value);
    setSearchText(value);
  };

  const filteredGames = utilsService.searchByString(games);

  const handleOutsideClick = () => {
    handleCloseMobileSearchModal("mobileSearchModal");
    handleToggleDesktopSearchBar("desktopSearchBar");
  };

  return (
    <div className="flex-1">
      {mobileSearchModalState && !resolutionState && (
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
              onClick={() => handleCloseMobileSearchModal("mobileSearchModal")}
            />
          </div>
          <SearchResultsContainer filteredGames={filteredGames} />
        </div>
      )}
      {desktopSearchBarState ? (
        // TODO DOUBLE CLICK SEARCH PROBLEM
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
            {desktopSearchBarState && (
              <IoCloseSharp
                size="25px"
                color="white"
                className="cursor-pointer"
              />
            )}
            {desktopSearchBarState && (
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
