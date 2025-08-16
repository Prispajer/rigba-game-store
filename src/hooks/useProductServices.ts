import React from "react";
import { z } from "zod";
import requestService from "@/services/RequestService";
import { generateRandomPrice } from "@/utils/prices";
import { ReviewSchema } from "@/utils/schemas/product";
import { GameAPIResponse } from "@/types/types";
import { RatingTitle } from "@prisma/client";
import { User } from "next-auth";

export default function useProductServices() {
  const [success, setSuccess] = React.useState<{
    message?: string;
    origin?: string;
  } | null>();
  const [error, setError] = React.useState<{
    message?: string;
    origin?: string;
  } | null>();

  const clearNotifications = () => {
    setError(null);
    setSuccess(null);
  };

  React.useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        clearNotifications();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  function useProductActions() {
    const submitReviewForm = async (
      data: z.infer<typeof ReviewSchema>,
      ratingsKeys: { [key: string]: string },
      user: User,
      product: GameAPIResponse
    ) => {
      clearNotifications();
      const { review, rating } = data;
      const title = ratingsKeys[rating];
      try {
        const response = await requestService.postMethod(
          "products/endpoints/productManagement/addReviewToProduct",
          {
            email: user?.email as string,
            externalProductId: product.id,
            name: product.name,
            description: review,
            background_image: product.background_image,
            price: generateRandomPrice(),
            rating: parseInt(rating),
            title: title as RatingTitle,
            slug: product.slug,
            released: product.released,
            added: product.added,
            likes: 0,
          }
        );
        if (response.success) {
          setSuccess({
            message: response.message,
            origin: "Review",
          });
        } else {
          setError({
            message: response.message,
            origin: "Review",
          });
        }
      } catch (error) {
        setError({
          message: "There was a problem while writing a review!",
          origin: "Review",
        });
      }
    };

    return {
      submitReviewForm,
    };
  }

  return {
    success,
    error,
    setError,
    useProductActions,
  };
}
