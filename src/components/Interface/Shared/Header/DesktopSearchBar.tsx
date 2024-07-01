import React, { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import UtilsService from "@/utils/classes/utilsService";
import debounce from "@/utils/debounce";
import { IoCloseSharp } from "react-icons/io5";
import SearchResultsContainer from "./SearchResultsContainer";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import IUtilsService from "@/utils/interfaces/iUtilsService";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import fetchService from "@/utils/classes/fetchService";

export default function DesktopSearchBar() {
  const { desktopSearchBarState, handleToggle } = useWindowVisibility();
  const [searchText, setSearchText] = React.useState("");
  const [games, setGames] = React.useState<[]>([]);

  const utilsService: IUtilsService = new UtilsService(searchText);

  const getGames = async () => {
    try {
      const games = await fetchService.getGames();
      setGames(games);
      return games;
    } catch (error) {
      console.error("An problem has occured while fetching games data!");
    }
  };

  React.useEffect(() => {
    getGames();
  }, []);

  const handleOutsideClick = () => {
    handleToggle("desktopSearchBar");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    utilsService.setSearchText(value);
    setSearchText(value);
  };

  const filteredGames = utilsService.searchProducts(games || []);

  return (
    <div className="flex-1">
      {desktopSearchBarState ? (
        <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
          <div className="relative hidden md:flex items-center flex-1 p-[20px] border-[white] border-[2px] z-20">
            <FaSearch size="25px" color="white" className="mr-3" />
            <input
              className="text-[white] border-none outline-none bg-transparent w-[100%]"
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
                onClick={() => setSearchText("")}
              />
            )}
            {desktopSearchBarState ? (
              <SearchResultsContainer filteredGames={filteredGames} />
            ) : (
              ""
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
