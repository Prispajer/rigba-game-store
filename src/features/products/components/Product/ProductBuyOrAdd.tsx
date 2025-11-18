"use client";

import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { generateRandomPrice } from "@/features/products/utils/prices";
import ApiProductDetails from "@/features/products/types/api/apiProductDetails";
import { User } from "next-auth";
import AddUserCartItemDTO from "@/features/cart/dto/AddUserCartItemDTO";
import LocalStorageCartProduct from "@/features/cart/types/localStorageCart/localStorageCartProduct";

export default function ProductBuyOrAdd(props: {
    product: ApiProductDetails;
    user: User | null;
    isCartLoading: boolean;
    handleAddUserProductToCart: (product: AddUserCartItemDTO) => void;
    handleAddLocalStorageProductToCart: (product: LocalStorageCartProduct) => void;
    redirectToCheckout: () => void;
}) {
    const handleAddProduct = () => {
        if (props.user) {
            props.handleAddUserProductToCart({
                ...(props.product),
                email: props.user.email as string,
                externalProductId: props.product.id as number,
                description: props.product.description_raw as string,
                rating: props.product.rating as number,
                released: props.product.released as string,
                added: props.product.added as number,
                price: generateRandomPrice(),
                quantity: null,
            });
        } else {
            props.handleAddLocalStorageProductToCart({
                externalProductId: props.product.id as number,
                description: props.product.description_raw as string,
                price: generateRandomPrice(),
                quantity: 1,
                name: props.product.name,
                background_image: props.product.background_image,
                rating: props.product.rating,
                released: props.product.released,
                slug: props.product.slug,
                added: props.product.added,
            });
        }
    };

    return (
        <div className="flex flex-col sm:mx-[20px] my-[20px] py-[15px] px-[20px] bg-[#387CBD] shadow-md">
            <div className="max-w-[350px]">
                <div className="flex w-[70px]">
                    <div className="flex min-w-[200px] mb-[10px]">
            <span className="w-full font-[700] text-[18px] text-[#ffffff] cursor-default">
              {`$${generateRandomPrice()}`}
            </span>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 pr-[20px] bg-transparent">
                        <button
                            onClick={() => {
                                handleAddProduct();
                                props.redirectToCheckout();
                            }}
                            className="w-full min-h-[35px] transition duration-300 font-medium text-buttonTextColor bg-buttonBackground hover:bg-buttonBackgroundHover"
                        >
                            Buy now
                        </button>
                    </div>
                    <button
                        className="flex items-center min-h-[35px] px-[10px] bg-transparent border-[2px] cursor-pointer border-white hover:bg-tertiaryColor hover:border-headerHover transition ease-in-out"
                        disabled={props.isCartLoading}
                        onClick={handleAddProduct}
                    >
                        <FaCartPlus size="20px" color="#ffffff" />
                    </button>
                </div>
            </div>
        </div>
    );
}