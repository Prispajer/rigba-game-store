import React from "react";
import { useSearchParams } from "next/navigation";
import useCurrentUser from "./useCurrentUser";
import useWindowVisibility from "./useWindowVisibility";
import requestService from "@/services/RequestService";
import { generateRandomValue } from "@/utils/prices";
import { ReviewSchema } from "@/utils/schemas/product";
import { GameAPIResponse } from "@/utils/helpers/types";
import { User, RatingTitle } from "@prisma/client";

export default function useProductServices() {
  const [error, setError] = React.useState<string | undefined>();
  const [success, setSuccess] = React.useState<string | undefined>();

  function useProductActions() {
    const submitReviewForm = async (
      data: z.infer<typeof ReviewSchema>,
      ratingsKeys: { [key: string]: string },
      user: User,
      product: GameAPIResponse
    ) => {
      const { review, rating } = data;
      const title = ratingsKeys[rating as keyof typeof ratingsKeys];

      try {
        const response = await requestService.postMethod(
          "products/endpoints/productManagement/addReviewToProduct",
          {
            email: user?.email as string,
            externalProductId: product.id,
            name: product.name,
            description: review,
            background_image: product.background_image,
            price: generateRandomValue(),
            rating: parseInt(rating),
            title: title as RatingTitle,
            slug: product.slug,
            released: product.released,
            added: product.added,
            likes: 0,
          }
        );
        if (response.success) {
          setSuccess(response.message);
          return response.data;
        } else {
          setError(response.message);
          throw new Error(response.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error adding review:", error);
      }
    };

    return {
      submitReviewForm,
    };
  }

  return {
    success,
    error,
    useProductActions,
  };
}
