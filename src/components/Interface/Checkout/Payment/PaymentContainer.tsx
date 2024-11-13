"use client";

import React from "react";
import Image from "next/image";
import {
  useStripe,
  useElements,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUserCart from "@/hooks/useUserCart";
import useCurrentUser from "@/hooks/useCurrentUser";
import useCustomRouter from "@/hooks/useCustomRouter";
import { UserCartState } from "@/redux/slices/userCartSlice";
import { LocalStorageState } from "@/redux/slices/localStorageSlice";

export default function PaymentContainer() {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  const stripe = useStripe();
  const elements = useElements();
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

  const isUserCart = (
    cart: UserCartState["products"] | LocalStorageState["localCart"]
  ): cart is UserCartState["products"] => {
    return cart.some(
      (item: UserCartState["products"]) => "productsInformations" in item
    );
  };

  console.log(isUserCart(productsByRole));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !email) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe?.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_URL}/checkout/redeem`,
      },
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setErrorMessage(error.message as string);
    }

    setIsProcessing(false);
  };

  return (
    <section className="flex flex-col items-center w-full h-[calc(100vh-96px)] md:py-[20px] md:px-[15px] bg-primaryColor mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:max-w-[1040px] mx-auto p-[15px] gap-x-[20px] bg-secondaryColor md:bg-primaryColor">
        <div className="h-min p-[20px] text-[#FFFFFF] bg-secondaryColor">
          <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement />
            <LinkAuthenticationElement
              onChange={(event) => setEmail(event.value.email)}
              className="pt-[20px]"
            />
            <button
              disabled={stripe == null || elements == null || isProcessing}
              className="w-full my-[20px] p-[10px] bg-buttonBackground hover:to-buttonBackgroundHover text-buttonTextColor cursor-pointer"
              id="submit"
            >
              <span id="button-text">
                {isProcessing ? "Processing..." : "Pay"}
              </span>
            </button>
            <span className="text-[#DF1B41]">
              {errorMessage ? errorMessage : ""}
            </span>
          </form>
        </div>
        <div className="w-full bg-secondaryColor md:p-[20px]">
          <h2 className="hidden md:flex text-[18px] mb-[20px] font-bold text-[#ffffff]">
            My cart
          </h2>
          <ul className="flex flex-col">
            {productsByRole.map((product) => (
              <li
                onClick={() =>
                  redirectToGame(
                    (isUserCart(productsByRole)
                      ? product.productsInformations?.slug
                      : product.slug) || product.slug
                  )
                }
                key={product.externalProductId}
                className="bg-tertiaryColor relative flex p-[20px] mb-[10px] gap-x-[10px] cursor-pointer"
              >
                <div className="flex-0 h-[70px] w-[50px] md:h-[130px] max-w-[60px] md:w-[90px] md:max-w-[90px]">
                  <div className="relative h-full w-full">
                    <Image
                      src={
                        isUserCart(productsByRole)
                          ? product.productsInformations?.background_image
                          : product.background_image
                      }
                      layout="fill"
                      alt={
                        isUserCart(productsByRole)
                          ? product.productsInformations?.name
                          : product.name
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex justify-between">
                    <div className="text-[#FFFFFF] font-[700]">
                      {isUserCart(productsByRole)
                        ? product.productsInformations?.name
                        : product.name}
                    </div>
                    <div className="absolute right-[20px] top-[20px] text-[#ffffffb3] cursor-pointer">
                      <FaRegTrashAlt
                        onClick={(e) => {
                          e.stopPropagation();
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
                        {isUserCart(productsByRole)
                          ? product.productsInformations?.price
                          : product.price}
                        zł
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
