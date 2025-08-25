import { Metadata } from "next";
import ReviewContainer from "@/features/reviews/components/Review/ReviewContainer";
import fetchService from "@/services/FetchService";

export const generateMetadata = async (data: {
  params: { productId: string };
}): Promise<Metadata> => {
  const product = await fetchService.getProduct(data.params.productId);

  return {
    title: `Review ${product.name}`,
  };
};

export default async function ReviewPage(data: {
  params: Promise<{ productId: string }>;
}) {
  const params = await data.params;
  const product = await fetchService.getProduct(params.productId);

  return <ReviewContainer product={product} />;
}
