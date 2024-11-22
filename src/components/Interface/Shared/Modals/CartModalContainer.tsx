import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUserCart from "@/hooks/useUserCart";
import useCurrentUser from "@/hooks/useCurrentUser";
import useCustomRouter from "@/hooks/useCustomRouter";
import { calculateTotalPrice } from "@/utils/prices";

export default function CartModalContainer() {
  const { user } = useCurrentUser();
  const { cartModalState, handleClose } = useWindowVisibility();
  const {
    userCartState,
    handleDeleteUserProductFromCart,
    handleDecreaseQuantityUserProductFromCart,
    handleIncreaseQuantityUserProductFromCart,
  } = useUserCart();
  const {
    localCartState,
    handleDeleteLocalProductFromCart,
    handleDecreaseQuantityLocalProductFromCart,
    handleIncreaseQuantityLocalProductFromCart,
  } = useLocalStorage("localCart");
  const { redirectToGame } = useCustomRouter();

  const handleOutsideClick = () => {
    if (cartModalState) {
      handleClose("cartModal");
    }
  };

  const productsByRole = user ? userCartState.products : localCartState;

  return (
    <>
      {cartModalState && (
        <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
          <div
            className={`cart-modal ${
              user ? "md:translate-x-[-33px]" : "md:translate-x-[-149px]"
            }`}
          >
            <div className="flex justify-between items-center text-white border-b-[1px] border-[#ffffff1a] p-[20px]">
              <strong className="text-[20px] cursor-default">My cart</strong>
              <button onClick={() => handleClose("cartModal")}>
                <IoCloseSharp className="hover:text-modalHover" size="25px" />
              </button>
            </div>
            <ul className="flex flex-col w-full">
              {productsByRole.map((product) => {
                if ("productsInformations" in product) {
                  return (
                    <li
                      key={product.externalProductId}
                      className="flex w-full p-[20px] gap-2 border-b-[1px] border-[#ffffff1a]"
                    >
                      <div className="relative flex flex-0 min-w-[50px] items-center h-[100px] cursor-pointer">
                        <Image
                          onClick={() =>
                            redirectToGame(
                              product.productsInformations?.slug as string,
                              handleClose,
                              "cartModal"
                            )
                          }
                          src={
                            product.productsInformations.background_image ?? ""
                          }
                          layout="fill"
                          alt={product.productsInformations.name as string}
                        />
                      </div>
                      <div className="flex flex-1 flex-col px-2 gap-y-[10px] text-white">
                        <div
                          onClick={() =>
                            redirectToGame(
                              product.productsInformations.slug as string,
                              handleClose,
                              "cartModal"
                            )
                          }
                          className="flex flex-0 font-medium hover:text-modalHover cursor-pointer"
                        >
                          {product.productsInformations.name}
                        </div>
                        <div className="flex items-center text-[#ffffffb3] text-[16px]">
                          <span className="mr-1 cursor-default">
                            Digital product
                          </span>
                          <span className="mt-1 hover:text-modalHover">
                            <HiMiniQuestionMarkCircle />
                          </span>
                        </div>
                        <div className="flex justify-between items-center w-full text-white">
                          <div>
                            <button
                              className="mr-2 hover:text-modalHover"
                              onClick={() =>
                                handleDecreaseQuantityUserProductFromCart({
                                  email: user?.email,
                                  externalProductId: product.externalProductId,
                                })
                              }
                            >
                              -
                            </button>
                            <span className="cursor-default">
                              {product.quantity || 1}
                            </span>
                            <button
                              className="ml-2 hover:text-modalHover"
                              onClick={() =>
                                handleIncreaseQuantityUserProductFromCart({
                                  email: user?.email,
                                  externalProductId: product.externalProductId,
                                })
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              handleDeleteUserProductFromCart({
                                email: user?.email,
                                externalProductId: product.externalProductId,
                              })
                            }
                            className="text-[14px] hover:text-modalHover"
                          >
                            <FaRegTrashAlt />
                          </button>
                          <div>
                            <strong className="cursor-default">
                              ${product.productsInformations?.price}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                } else {
                  return (
                    <li
                      key={product.externalProductId}
                      className="flex w-full p-[20px] gap-2 border-b-[1px] border-[#ffffff1a]"
                    >
                      <div className="relative flex flex-0 min-w-[50px] items-center h-[100px] cursor-pointer">
                        <Image
                          onClick={() =>
                            redirectToGame(
                              product.slug,
                              handleClose,
                              "cartModal"
                            )
                          }
                          src={product.background_image ?? ""}
                          layout="fill"
                          alt={product.name}
                        />
                      </div>
                      <div className="flex flex-1 flex-col px-2 gap-y-[10px] text-white">
                        <div
                          onClick={() =>
                            redirectToGame(
                              product.slug,
                              handleClose,
                              "cartModal"
                            )
                          }
                          className="flex flex-0 font-medium hover:text-modalHover cursor-pointer"
                        >
                          {product.name}
                        </div>
                        <div className="flex items-center text-[#ffffffb3] text-[16px]">
                          <span className="mr-1 cursor-default">
                            Digital product
                          </span>
                          <span className="mt-1 hover:text-modalHover">
                            <HiMiniQuestionMarkCircle />
                          </span>
                        </div>
                        <div className="flex justify-between items-center w-full text-white">
                          <div>
                            <button
                              className="mr-2 hover:text-modalHover"
                              onClick={() =>
                                handleDecreaseQuantityLocalProductFromCart(
                                  product.externalProductId
                                )
                              }
                            >
                              -
                            </button>
                            <span className="cursor-default">
                              {product.quantity || 1}
                            </span>
                            <button
                              className="ml-2 hover:text-modalHover"
                              onClick={() =>
                                handleIncreaseQuantityLocalProductFromCart(
                                  product.externalProductId
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              handleDeleteLocalProductFromCart(
                                product.externalProductId
                              )
                            }
                            className="text-[14px] hover:text-modalHover"
                          >
                            <FaRegTrashAlt />
                          </button>
                          <div>
                            <strong className="cursor-default">
                              ${product.price}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
            {productsByRole.length ? (
              <div className="p-[20px]">
                <div className="flex justify-between items-center w-full text-white">
                  <strong className="cursor-default">Summary</strong>
                  <strong className="text-[30px] pb-[8px] cursor-default">
                    ${calculateTotalPrice(productsByRole)}
                  </strong>
                </div>
                <div className="w-full">
                  <Link href="/checkout">
                    <button className="w-[100%] min-h-[35px] transition duration-300 font-medium text-buttonTextColor bg-buttonBackground hover:bg-buttonBackgroundHover">
                      Show cart
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="pt-[30px] px-[20px] pb-[20px]">
                <div className="flex flex-col justify-between items-center text-center text-white">
                  <VscWorkspaceUnknown size="40" />
                  <strong className="text-[20px] cursor-default">
                    Your cart is empty!
                  </strong>
                  <strong className="text-[#ffffff80] text-[14px] pb-[8px] cursor-default">
                    looks like you haven&apos;t selected any products yet.
                  </strong>
                </div>
              </div>
            )}
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
}
