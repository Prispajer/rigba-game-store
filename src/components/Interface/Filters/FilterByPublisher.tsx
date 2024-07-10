import React from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import fetchService from "@/utils/classes/fetchService";
import useFetchGameData from "@/hooks/useFetchGameData";
import { setPublishersId } from "@/redux/slices/productFetchAndFilterSlice";

export default function FilterByType() {
  const { productFetchAndFilterState, handleFilterChange } = useFetchGameData();
  const [data, setData] = React.useState<any[]>([]);

  console.log(data);

  React.useEffect(() => {
    const getGamesType = async () => {
      const gamesTypes = await fetchService.getGamesTypes(1);
      console.log("Fetched games types:", gamesTypes); // Dodaj ten log
      setData(gamesTypes);
    };
    getGamesType();
  }, []);
  return (
    <>
      <div className="py-[15px] px-[20px] text-[#ffffff] text-[16px]  border-b-[2px] border-b-primaryColor">
        <div className="flex items-center justify-between max-w-[300px] pb-[10px] cursor-pointer">
          <span>Publisher</span>
          <MdKeyboardArrowUp size="25px" />
        </div>
        <div className="flex items-center">
          <ul className="w-full">
            {data.map((publisher) => (
              <li
                key={publisher.id}
                className="flex justify-between items-center mb-[10px]"
              >
                <input
                  className="flex-0"
                  type="checkbox"
                  checked={productFetchAndFilterState.publishersId.includes(
                    publisher.id
                  )}
                  onClick={() =>
                    handleFilterChange(
                      publisher.id,
                      productFetchAndFilterState.publishersId,
                      setPublishersId
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
