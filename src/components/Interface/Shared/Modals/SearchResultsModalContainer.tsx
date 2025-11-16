import React from "react";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import LoadingAnimation from "../Animations/LoadingAnimation";
import useUIVisibility from "@/hooks/useUiVisibility";
import useCustomRouter from "@/hooks/useCustomRouter";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import {generateRandomPrice} from "@/features/products/utils/prices";
import ApiProduct from "@/features/products/types/api/apiProduct";
import ApiProductDetails from "@/features/products/types/api/apiProductDetails";
import useUserCartActions from "@/features/cart/hooks/userCart/useUserCartActions";
import useLocalStorageCartActions from "@/features/cart/hooks/localStorageCart/useLocalStorageCartActions";

export default function SearchResultsModalContainer({
  gamesArray,
  loadingState,
}: {
  gamesArray: ApiProductDetails[];
  loadingState: boolean;
}) {
  const { handleAddUserProductToCart } = useUserCartActions();
  const { handleAddLocalStorageProductToCart } = useLocalStorageCartActions();
  const { user } = useCurrentUser();
  const { redirectToProduct } = useCustomRouter();
  const { handleHideElement } = useUIVisibility();

  const handleAddProductToCart = (
    game: ApiProduct,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (user) {
      handleAddUserProductToCart({
        ...game,
        email: user.email,
        externalProductId: game.id,
        description: game.description_raw,
        price: generateRandomPrice(),
        quantity: null,
      });
    } else {
      handleAddLocalStorageProductToCart({
        ...game,
        externalProductId: game.id,
        description: game.description_raw,
        price: generateRandomPrice(),
        quantity: 1,
      });
    }
  };

  return (
    <div className="absolute top-[67px] left-0 w-full bg-primaryColor ">
      {loadingState ? (
        <LoadingAnimation />
      ) : gamesArray && gamesArray.length > 0 ? (
        gamesArray.map((game) => (
          <ul key={game.id}>
            <li
              className="my-[10px] py-[5px] cursor-pointer hover:bg-secondaryColor"
              onClick={() =>
                  redirectToProduct(
                  game?.slug as string,
                    handleHideElement,
                  "searchBarModal"
                )
              }
            >
              <div className="flex justify-between px-[15px]">
                <div className="flex">
                  <div className="relative min-w-[72px] min-h-[100px]">
                    <Image
                      loading="eager"
                      fill={true}
                      src={game?.background_image ?? "/placeholder.jpg"}
                      alt={game?.name}
                    />
                  </div>
                  <div className="ml-[10px]">
                    <span className="py-[2px] px-[8px] text-[12px] text-[#e5e176] border-[2px] border-[#e5e176] rounded-full">
                      Produkt cyfrowy
                    </span>
                    <div className="mt-[6px]">
                      <span className="text-[#FFFFFF] font-bold">
                        {game?.name}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-[60px]">
                  <span className="text-[14px] text-right font-bold text-[#FFFFFF96]">
                    Od
                  </span>
                  <span className="mt-[-2px] text-buttonBackground font-bold text-end">
                    ${generateRandomPrice()}
                  </span>
                  <button
                    onClick={(event) => handleAddProductToCart(game, event)}
                    className="flex items-center justify-center w-[100%] h-[35px] mt-[10px] border-2 border-white hover:bg-tertiaryColor hover:border-headerHover transition ease-in-out"
                  >
                    <FaCartPlus size="20px" color="#ffffff" />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        ))
      ) : (
        <div className="px-[15px] py-[10px] text-white">
          <span>No results found</span>
        </div>
      )}
    </div>
  );
}
