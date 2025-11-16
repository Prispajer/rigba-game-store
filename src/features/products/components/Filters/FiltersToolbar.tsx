import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import {
    setPublishersIdArray,
    setGenresIdArray,
    setPlatformsIdArray,
    setStoresIdArray,
} from "@/features/products/redux/slices/filters/filtersSlice";
import FilterModalContainer from "../../../../components/Interface/Shared/Modals/FilterModalContainer";
import SortAndFilterSidebar from "../../../../components/Interface/Shared/Sidebars/SortAndFilterSidebar";
import useFetchGameData from "@/features/products/hooks/useFetchGameData";
import useSearchText from "@/hooks/useSearchText";
import useUiVisibility from "@/hooks/useUiVisibility";

export default function FiltersToolbar() {
    const [hasFiltersNumber, setHasFiltersNumber] = React.useState<number | null>(null);

    const {
        productFilterState,
        productPublishersState,
        productPlatformsState,
        productGenresState,
        productStoresState,
        handleClearAllFilters,
        handleFetchProductsWithFilters,
    } = useFetchGameData();

    const {
        searchGenreTextState,
        searchPlatformTextState,
        searchPublisherTextState,
        searchStoreTextState,
    } = useSearchText();

    const {
        publishersModalState,
        platformsModalState,
        genresModalState,
        storesModalState,
        resolutionState,
        sortAndFilterModalState,
        handleShowElement,
    } = useUiVisibility();

    const totalFilters = React.useMemo(() => {
        const filters = [
            productFilterState.publishersIdArray,
            productFilterState.genresIdArray,
            productFilterState.platformsIdArray,
            productFilterState.storesIdArray,
        ];

        return filters.reduce((acc, current) => {
            return acc + (current.some((value) => value > 0) ? 1 : 0);
        }, 0);
    }, [productFilterState]);

    React.useEffect(() => {
        setHasFiltersNumber(totalFilters);
        handleFetchProductsWithFilters(productFilterState.page);
    }, [totalFilters, productFilterState.page]);

    return (
        <div className="scrollbar-filters-selected-filters relative overflow-x-auto md:overflow-visible">
            <ul className="relative flex items-center flex-nowrap gap-[10px] pb-[25px]">
                {!resolutionState && (
                    <>
                        <li className="shrink-0">
                            <button
                                onClick={() => handleShowElement("sortAndFilterModal")}
                                className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]"
                            >
                <span className="flex items-center gap-x-[5px] mr-[2px]">
                  <IoFilterSharp /> Sort and filter ({hasFiltersNumber})
                </span>
                                <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
                            </button>
                            {sortAndFilterModalState && <SortAndFilterSidebar />}
                        </li>
                        <div className="h-[30px] mx-[6px]">
                            <span className="h-[30px] text-[#FFFFFF]">|</span>
                        </div>
                    </>
                )}

                {productFilterState.publishersIdArray.length > 0 && (
                    <li className="shrink-0">
                        <button
                            onClick={() => handleShowElement("publishersModal")}
                            className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]"
                        >
              <span className="mr-[2px]">
                Publishers ({productFilterState.publishersIdArray.length})
              </span>
                            <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
                        </button>
                        {publishersModalState && (
                            <FilterModalContainer
                                filterLabel="Publisher"
                                searchText="searchPublisherText"
                                searchState={searchPublisherTextState as string}
                                apiFiltersArray={productPublishersState.publishersArray}
                                selectedFiltersId={productFilterState.publishersIdArray}
                                setSelectedFiltersId={setPublishersIdArray}
                                clickedModal="publishersModal"
                            />
                        )}
                    </li>
                )}

                {productFilterState.platformsIdArray.length > 0 && (
                    <li className="shrink-0">
                        <button
                            onClick={() => handleShowElement("platformsModal")}
                            className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]"
                        >
              <span className="mr-[2px]">
                Platforms ({productFilterState.platformsIdArray.length})
              </span>
                            <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
                        </button>
                        {platformsModalState && (
                            <FilterModalContainer
                                filterLabel="Platforms"
                                searchText="searchPlatformText"
                                searchState={searchPlatformTextState as string}
                                apiFiltersArray={productPlatformsState.platformsArray}
                                selectedFiltersId={productFilterState.platformsIdArray}
                                setSelectedFiltersId={setPlatformsIdArray}
                                clickedModal="platformsModal"
                            />
                        )}
                    </li>
                )}

                {productFilterState.genresIdArray.length > 0 && (
                    <li className="shrink-0">
                        <button
                            onClick={() => handleShowElement("genresModal")}
                            className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]"
                        >
              <span className="mr-[2px]">
                Genres ({productFilterState.genresIdArray.length})
              </span>
                            <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
                        </button>
                        {genresModalState && (
                            <FilterModalContainer
                                filterLabel="Genres"
                                searchText="searchGenreText"
                                searchState={searchGenreTextState as string}
                                apiFiltersArray={productGenresState.genresArray}
                                selectedFiltersId={productFilterState.genresIdArray}
                                setSelectedFiltersId={setGenresIdArray}
                                clickedModal="genresModal"
                            />
                        )}
                    </li>
                )}

                {productFilterState.storesIdArray.length > 0 && (
                    <li className="shrink-0">
                        <button
                            onClick={() => handleShowElement("storesModal")}
                            className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff]"
                        >
              <span className="mr-[2px]">
                Stores ({productFilterState.storesIdArray.length})
              </span>
                            <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
                        </button>
                        {storesModalState && (
                            <FilterModalContainer
                                filterLabel="Stores"
                                searchText="searchStoreText"
                                searchState={searchStoreTextState as string}
                                apiFiltersArray={productStoresState.storesArray}
                                selectedFiltersId={productFilterState.storesIdArray}
                                setSelectedFiltersId={setStoresIdArray}
                                clickedModal="storesModal"
                            />
                        )}
                    </li>
                )}

                {!resolutionState && (
                    <li className="shrink-0 mx-[6px]">
                        <button
                            onClick={handleClearAllFilters}
                            className="text-[18px] text-modalHover"
                        >
                            Clear all
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}