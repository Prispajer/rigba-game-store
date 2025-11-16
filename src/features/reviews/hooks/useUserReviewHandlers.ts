import { z } from "zod";
import submitRequest from "@/lib/submitRequest";
import useNotification from "@/hooks/useNotification";
import { ReviewSchema } from "@/utils/schemas/product";
import ApiProductDetails from "@/features/products/types/api/apiProductDetails";
import HttpMethod from "@/shared/enums/httpMethod";
import { NotificationOrigin } from "@/redux/slices/notification/notification.types";
import mapReviewToProductDTO from "../mappers/mapReviewToProductDTO";

export default function useUserReviewHandlers() {
  const { handleShowSuccessNotification, handleShowErrorNotification, handleClearNotification } = useNotification();

  const handleReviewSubmit = async (
    payload: z.infer<typeof ReviewSchema>,
    product: ApiProductDetails,
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
      { handleShowSuccessNotification, handleShowErrorNotification, handleClearNotification }
    );

    if (!response) return;
  };

  return {
    handleReviewSubmit,
  };
}
