import React from "react";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import LoadingAnimation from "../Animations/LoadingAnimation";
import useUIVisibility from "@/hooks/useUIVisibility";
import useCustomRouter from "@/hooks/useCustomRouter";
import useUserCart from "@/features/cart/hooks/useCart";
import useLocalStorage from "@/hooks/useLocalStorage";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import { generateRandomPrice } from "@/utils/prices";
import { GameAPIProduct, GameAPIResponse } from "@/types/types";

export default function SearchResultsModalContainer({
  gamesArray,
  loadingState,
}: {
  gamesArray: GameAPIResponse[];
  loadingState: boolean;
}) {
  const { handleAddUserProductToCart } = useUserCart();
  const { handleAddLocalProductToCart } = useLocalStorage("localCart");
  const { user } = useCurrentUser();
  const { redirectToGame } = useCustomRouter();
  const { handleClose } = useUIVisibility();

  const handleAddProductToCart = (
    game: GameAPIProduct,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (user) {
      handleAddUserProductToCart({
        ...game,
        email: user.email as string,
        externalProductId: game.id,
        description: game.description_raw,
        price: generateRandomPrice(),
        quantity: null,
      });
    } else {
      handleAddLocalProductToCart({
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
                redirectToGame(
                  game?.slug as string,
                  handleClose,
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
