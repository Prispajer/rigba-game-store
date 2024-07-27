import React from "react";
import { Product } from "@/utils/helpers/types";
import { FaCartPlus } from "react-icons/fa";
import { FormSuccess } from "../Shared/FormsNotifications/FormSuccess";
import { FormError } from "../Shared/FormsNotifications/FormError";
import { generateRandomValue } from "@/utils/prices";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLocalStorage from "@/hooks/useLocalStorage";
import requestService from "@/utils/classes/requestService";

export default function ProductBuyOrAdd({ product }: { product: Product }) {
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const { handleAddLocalProduct } = useLocalStorage("localCart");
  const user = useCurrentUser();

  const handleAddToCart = async () => {
    try {
      if (user) {
        const response = await requestService.postMethod(
          "products/endpoints/productManagement/addProductToCart",
          {
            email: user?.email,
            externalProductId: product?.id,
            name: product?.name,
            description: product?.description_raw,
            price: generateRandomValue(),
            background_image: product?.background_image,
            rating: product?.rating,
            slug: product?.slug,
          }
        );
        if (response.success) {
          setSuccess(response.message);
        } else {
          setError(response.message);
        }
      } else {
        const localProduct: LocalStorageProduct = {
          externalProductId: product.id,
          name: product.name,
          description: product.description_raw,
          price: generateRandomValue(),
          background_image: product.background_image,
          rating: product?.rating,
          slug: product?.slug,
          quantity: 1,
        };
        handleAddLocalProduct(localProduct);
      }
    } catch (error) {
      setError("Error adding product to cart");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:mx-[20px] my-[20px] py-[15px] px-[20px] bg-[#387CBD] shadow-md">
        <div className="max-w-[350px]">
          <div className="flex w-[70px]">
            <div className="absolute top-[100px]"></div>
            <div>
              <span className="font-[700] text-[18px] text-[#ffffff]">
                47,43zł
              </span>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 pr-[20px] bg-transparent">
              <button className="w-full min-h-[35px] bg-buttonBackground text-buttonTextColor">
                Kup Teraz
              </button>
            </div>
            <div
              className="flex items-center min-h-[35px] px-[10px] bg-transparent border-[2px] cursor-pointer"
              onClick={handleAddToCart}
            >
              <FaCartPlus size="20px" color="#ffffff" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <FormSuccess message={success} />
          <FormError message={error} />
        </div>
      </div>
    </>
  );
}
