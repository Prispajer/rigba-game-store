import React from "react";
import { z } from "zod";
import requestService from "@/services/RequestService";
import { generateRandomValue } from "@/utils/prices";
import { ReviewSchema } from "@/utils/schemas/product";
import { GameAPIResponse } from "@/utils/helpers/types";
import { RatingTitle } from "@prisma/client";
import { User } from "next-auth";

export default function useProductServices() {
  const [error, setError] = React.useState<string | null>();
  const [success, setSuccess] = React.useState<string | null>();

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  function useProductActions() {
    const submitReviewForm = async (
      data: z.infer<typeof ReviewSchema>,
      ratingsKeys: { [key: string]: string },
      user: User,
      product: GameAPIResponse
    ) => {
      const { review, rating } = data;
      const title = ratingsKeys[rating as keyof typeof ratingsKeys];
      clearMessages();
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
