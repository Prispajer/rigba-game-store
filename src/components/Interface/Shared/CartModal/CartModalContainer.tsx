import React from "react";
import Image from "next/image";
import Link from "next/link";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function CartModalContainer() {
  const user = useCurrentUser();
  const { cartModalState, handleClose } = useWindowVisibility();
  const {
    localCartState,
    handleRemoveProduct,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
  } = useLocalStorage("LocalCart");

  const handleOutsideClick = () => {
    if (cartModalState) {
      handleClose("cartModal");
    }
  };

  const userProducts = user?.cart?.products || [];
  console.log(localCartState);
  const productsToDisplay = user ? userProducts : localCartState;

  return (
    <>
      {cartModalState && (
        <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
          <div className="cart-modal">
            <div className="flex justify-between items-center text-white border-b-[1px] border-[#ffffff1a] p-[20px]">
              <strong className="text-[20px] cursor-default">Mój koszyk</strong>
              <button>
                <IoCloseSharp
                  onClick={() => handleClose("cartModal")}
                  className="hover:text-modalHover"
                  size="25px"
                />
              </button>
            </div>
            <ul className="flex flex-col w-full">
              {productsToDisplay.map((product) => (
                <li
                  key={product.id}
                  className="flex w-full p-[20px] gap-2 border-b-[1px] border-[#ffffff1a]"
                >
                  <Link
                    href="/"
                    className="relative flex flex-0 min-w-[50px] items-center h-[100px]"
                  >
                    <Image
                      src={
                        product.productsInformations?.imageUrl ||
                        product.imageUrl
                      }
                      layout="fill"
                      alt={product.productsInformations?.name || product.name}
                    />
                  </Link>
                  <div className="flex flex-1 flex-col px-2 gap-y-[10px] text-white">
                    <Link
                      href="/"
                      className="flex w-full font-medium hover:text-modalHover"
                    >
                      {product.productsInformations?.name || product.name}
                    </Link>
                    <div className="flex items-center text-[#ffffffb3] text-[16px]">
                      <span className="mr-1 cursor-default">
                        Produkt cyfrowy
                      </span>
                      <span className="mt-1 hover:text-modalHover">
                        <HiMiniQuestionMarkCircle />
                      </span>
                    </div>
                    <div className="flex justify-between items-center w-full text-white">
                      <div>
                        <button
                          className="mr-2 hover:text-modalHover"
                          onClick={() => handleDecreaseQuantity(product.id)}
                        >
                          -
                        </button>
                        <span className="cursor-default">
                          {product.quantity || 1}
                        </span>
                        <button
                          className="ml-2 hover:text-modalHover"
                          onClick={() => handleIncreaseQuantity(product.id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="text-[14px] hover:text-modalHover"
                      >
                        <FaRegTrashAlt />
                      </button>
                      <div>
                        <strong className="cursor-default">
                          {product.productsInformations?.price || product.price}
                          zł
                        </strong>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-[20px]">
              <div className="flex justify-between items-center w-full text-white">
                <strong className="cursor-default">Łącznie</strong>
                <strong className="text-[30px] pb-[8px] cursor-default">
                  {productsToDisplay.reduce(
                    (total, product) =>
                      total +
                      (product.productsInformations?.price || product.price) *
                        (product.quantity || 1),
                    0
                  )}
                  zł
                </strong>
              </div>
              <div className="w-full">
                <button className="w-[100%] min-h-[35px] transition duration-300 font-medium text-buttonTextColor bg-buttonBackground hover:bg-buttonBackgroundHover">
                  Zobacz Koszyk
                </button>
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
}
