import Link from "next/link";
import React, { ChangeEvent } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import { UtilsService } from "@/utils/classes/utilsService";
import { IUtilsService } from "@/utils/interfaces/iUtilsService";
import SearchResultsContainer from "./SearchResultsContainer";
import debounce from "@/utils/classes/debounce";
import useFetchGameDataByLink from "@/hooks/useFetchGameDataByLink";

export default function MobileSearchModal() {
  const [searchText, setSearchText] = React.useState("");
  const games = useFetchGameDataByLink("https://api.rawg.io/api/games");

  const {
    mobileSearchModalState,
    resolutionState,
    handleClose,
    handleToggleScreen,
  } = useWindowVisibility();

  let searchService: IUtilsService;
  searchService = new UtilsService(searchText);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    searchService.setSearchText(value);
    setSearchText(value);
  };

  const filteredGames = searchService.searchProducts(games?.results || []);

  React.useEffect(() => {
    window.addEventListener("resize", handleToggleScreen(768));
    return () => {
      window.removeEventListener("resize", handleToggleScreen(768));
    };
  }, [handleToggleScreen]);

  return (
    <>
      {mobileSearchModalState && !resolutionState && (
        <div className="fixed top-0 right-0 bottom-0 h-full w-full z-10 bg-primaryColor">
          <div className="flex  items-center gap-y-[10px] py-[20px] bg-primaryColor font-medium border-b-secondaryColor border-b-2">
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
              onClick={() => handleClose("mobileSearchModal")}
            />
          </div>
          <SearchResultsContainer filteredGames={filteredGames} />
        </div>
      )}
    </>
  );
}
