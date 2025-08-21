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
import useUserCart from "@/features/cart/hooks/userCart/useUserCart";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import useCustomRouter from "@/hooks/useCustomRouter";
import { Order } from "@prisma/client";

export default function PaymentContainer({
  newOrder,
}: {
  newOrder: Order | null;
}) {
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !email) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/redeem/${newOrder?.id}`,
      },
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setErrorMessage(error.message as string);
    }

    setIsProcessing(false);
  };

  return (
    <section className="flex flex-col items-center w-full min-h-[calc(100vh-96px)] h-full md:py-[20px] md:px-[15px] bg-primaryColor mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:max-w-[1040px] mx-auto p-[15px] gap-x-[20px] bg-secondaryColor md:bg-primaryColor">
        <div className="h-min p-[20px] text-[#FFFFFF] bg-secondaryColor">
          <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement />
            <LinkAuthenticationElement
              onChange={(event) => setEmail(event.value.email)}
              className="pt-[20px]"
            />
            <button
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
                    "productsInformations" in product
                      ? (product.productsInformations.slug as string)
                      : product.slug
                  )
                }
                key={product.externalProductId}
                className="bg-tertiaryColor relative flex p-[20px] mb-[10px] gap-x-[10px] cursor-pointer"
              >
                <div className="flex-0 w-[50px] md:w-[90px] h-[70px] md:h-[130px]">
                  <div className="relative h-full w-full">
                    <Image
                      loading="eager"
                      src={
                        "productsInformations" in product
                          ? product.productsInformations?.background_image
                          : product.background_image
                      }
                      alt={
                        "productsInformations" in product
                          ? (product.productsInformations.name as string)
                          : product.name
                      }
                      fill={true}
                      sizes="(max-width: 768px) 50px, 90px"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex justify-between">
                    <div className="text-[#FFFFFF] font-[700]">
                      {"productsInformations" in product
                        ? product.productsInformations.name
                        : product.name}
                    </div>
                    <div className="absolute right-[20px] top-[20px] text-[#ffffffb3] cursor-pointer">
                      <FaRegTrashAlt
                        onClick={(e) => {
                          e.stopPropagation();
                          user
                            ? handleDeleteUserProductFromCart({
                                email: user.email as string,
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
                                email: user.email as string,
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
                                email: user.email as string,
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
                      {"productsInformations" in product ? (
                        <span>${product.productsInformations?.price}</span>
                      ) : (
                        <span>${product.price}</span>
                      )}
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
