"use client";

import React, { use } from "react";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import ProductHeaders from "../Shared/ReusableComponents/ProductHeaders";
import ProductList from "../Product/ProductList";
import CheckoutCart from "./CheckoutCart";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUserCart from "@/hooks/useUserCart";
import useCurrentUser from "@/hooks/useCurrentUser";
import useCustomRouter from "@/hooks/useCustomRouter";

export default function CheckoutContainer() {
  const { user } = useCurrentUser();
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

  const productsByRole = user ? userCartState.products : localCartState;

  return (
    <section className="flex flex-col items-center w-full min-h-[calc(100vh-96px)] md:py-[20px] md:px-[15px] bg-primaryColor mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,350px] w-full lg:max-w-[1040px] mx-auto p-[15px] gap-x-[20px] bg-secondaryColor md:bg-primaryColor">
        <div className="w-full bg-secondaryColor md:p-[20px]">
          <h2 className="hidden md:flex text-[18px] mb-[20px] font-bold text-[#ffffff] cursor-default">
            My cart
          </h2>
          <ul className="flex flex-col">
            {productsByRole.map((product) => (
              <li
                onClick={() =>
                  redirectToGame(
                    "productsInformations" in product
                      ? (product.productsInformations.slug as string)
                      : product.slug
                  )
                }
                key={product.externalProductId}
                className="bg-tertiaryColor relative flex p-[20px] mb-[10px] gap-x-[10px] cursor-pointer"
              >
                <div className="flex-0 h-[70px] w-[50px] md:h-[130px] max-w-[60px] md:w-[90px] md:max-w-[90px]">
                  <div className="relative h-full w-full">
                    <Image
                      loading="lazy"
                      src={
                        "productsInformations" in product
                          ? product.productsInformations?.background_image
                          : product.background_image
                      }
                      layout="fill"
                      alt={
                        "productsInformations" in product
                          ? (product.productsInformations.name as string)
                          : product.name
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex justify-between">
                    <div className="text-[#FFFFFF] font-[700]">
                      {"productsInformations" in product
                        ? product.productsInformations?.name
                        : product.name}
                    </div>
                    <div className="absolute right-[20px] top-[20px] text-[#ffffffb3] cursor-pointer">
                      <FaRegTrashAlt
                        onClick={(event: React.MouseEvent) => {
                          event.stopPropagation();
                          user
                            ? handleDeleteUserProductFromCart({
                                email: user.email,
                                externalProductId: product.externalProductId,
                              })
                            : handleDeleteLocalProductFromCart(
                                product.externalProductId
                              );
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="md:hidden flex items-center text-[#ffffffb3] text-[16px]">
                      <span className="text-[14px] mr-1 cursor-default">
                        Digital product
                      </span>
                      <span className="mt-1 hover:text-modalHover">
                        <HiMiniQuestionMarkCircle />
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between gap-x-10">
                    <div className="hidden md:flex flex-1 items-center text-[#ffffffb3] text-[16px]">
                      <span className="text-[14px] mr-1 cursor-default">
                        Digital product
                      </span>
                      <span className="mt-1 hover:text-modalHover">
                        <HiMiniQuestionMarkCircle />
                      </span>
                    </div>
                    <div className="flex-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          user
                            ? handleDecreaseQuantityUserProductFromCart({
                                email: user.email,
                                externalProductId: product.externalProductId,
                              })
                            : handleDecreaseQuantityLocalProductFromCart(
                                product.externalProductId
                              );
                        }}
                        className="text-[#FFFFFF] mr-2 hover:text-modalHover"
                      >
                        -
                      </button>
                      <span className="text-[#FFFFFF] cursor-default">
                        {product.quantity || 1}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          user
                            ? handleIncreaseQuantityUserProductFromCart({
                                email: user.email,
                                externalProductId: product.externalProductId,
                              })
                            : handleIncreaseQuantityLocalProductFromCart(
                                product.externalProductId
                              );
                        }}
                        className="text-[#FFFFFF] ml-2 hover:text-modalHover"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex-0 text-[#FFFFFF] font-[700]">
                      <span>
                        $
                        {"productsInformations" in product
                          ? product.productsInformations?.price
                          : product.price}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <CheckoutCart />
      </div>
      <div className="grid grid-cols-1 w-full max-w-[1040px] px-[15px] bg-secondaryColor md:bg-primaryColor">
        <ProductHeaders headerText="You may like" />
        <ProductList />
      </div>
    </section>
  );
}
