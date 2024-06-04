import React, { EventHandler } from "react";
import { FaSearch } from "react-icons/fa";
import { UtilsInterface } from "@/utils/interfaces/utilsInterface";
import { UtilsService } from "@/utils/classes/utilsService";
import debounce from "@/utils/classes/debounce";
import { useSearchParams } from "next/navigation";
import useFetchGameDataByLink from "@/hooks/useFetchGameDataByLink";
import { IoCloseSharp } from "react-icons/io5";
import SearchResultsContainer from "./SearchResultsContainer";

export default function Searchbar() {
  const [isFocused, setIsFocused] = React.useState(false);
  const [word, setWord] = React.useState("");
  const searchParams = useSearchParams();
  const productId = searchParams.get("/product/");
  const utilsService: UtilsInterface = new UtilsService("");
  const games = useFetchGameDataByLink("https://api.rawg.io/api/games");

  const filterByName = games?.results.filter((game) =>
    game.name.toLowerCase().includes(word.toLowerCase())
  );

  console.log(games);
  console.log(filterByName);
  console.log(productId);
  const handleChange = (event: EventChange) => {
    const value = event.target.value;
    setWord(value);
    utilsService.setSearchText(value);
  };

  console.log(word);
  console.log(utilsService.getSearchText());
  return (
    <div className="relative hidden md:flex items-center  flex-1 p-[20px] border-[white] border-[2px] bg-transparent">
      <FaSearch size="25px" color="white" className="mr-3" />
      <input
        className="text-[white] border-none outline-none bg-transparent w-[100%]"
        onChange={debounce(handleChange, 1000)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type="text"
        name="text"
        placeholder="Szukaj"
        autoComplete="off"
      />
      {isFocused && (
        <IoCloseSharp
          size="25px"
          color="white"
          className="cursor-pointer"
          onClick={() => handleChange("")}
        />
      )}
      <SearchResultsContainer />
    </div>
  );
}
