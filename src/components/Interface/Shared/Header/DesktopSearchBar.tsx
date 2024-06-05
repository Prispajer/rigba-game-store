// Searchbar.js
import React, { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { UtilsService } from "@/utils/classes/utilsService";
import debounce from "@/utils/classes/debounce";
import { useSearchParams } from "next/navigation";
import useFetchGameDataByLink from "@/hooks/useFetchGameDataByLink";
import { IoCloseSharp } from "react-icons/io5";
import SearchResultsContainer from "./SearchResultsContainer";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import { IUtilsService } from "@/utils/interfaces/iUtilsService";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function DesktopSearchBar() {
  const { desktopSearchBarState, handleToggle } = useWindowVisibility();
  const [searchText, setSearchText] = React.useState("");
  const searchParams = useSearchParams();
  const productId = searchParams.get("/product/");
  const games = useFetchGameDataByLink("https://api.rawg.io/api/games");

  let searchService: IUtilsService;
  searchService = new UtilsService(searchText);

  const handleOutsideClick = () => {
    handleToggle("desktopSearchBar");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    searchService.setSearchText(value);
    setSearchText(value);
  };

  const filteredGames = searchService.searchProducts(games?.results || []);

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
