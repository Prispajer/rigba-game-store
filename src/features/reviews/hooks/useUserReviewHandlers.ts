import { z } from "zod";
import submitRequest from "@/lib/submitRequest";
import { generateRandomPrice } from "@/utils/prices";
import useNotification from "@/hooks/useNotification";
import { ReviewSchema } from "@/utils/schemas/product";
import { GameAPIResponse } from "@/types/types";
import { HttpMethod } from "@/types/types";
import { NotificationOrigin } from "@/redux/slices/notification/notification.types";
import mapReviewToProductDTO from "../mappers/mapReviewToProductDTO";

export default function useUserReviewHandlers() {
  const { handleSuccess, handleError, handleReset } = useNotification();

  const handleReviewSubmit = async (
    payload: z.infer<typeof ReviewSchema>,
    product: GameAPIResponse,
    ratingsKeys: { [key: string]: string },
    email: string
  ) => {
    const { reviewDescription, rating } = payload;
    const title = ratingsKeys[rating];

    const response = await submitRequest(
      HttpMethod.POST,
      "products/endpoints/productManagement/addReviewToProduct",
      mapReviewToProductDTO(product, email, reviewDescription, title),
      NotificationOrigin.AddReviewToProduct,
      { handleSuccess, handleError, handleReset }
    );

    if (!response) return;
  };

  return {
    handleReviewSubmit,
  };
}
