import { Metadata } from "next";
import ReviewContainer from "@/components/Interface/Review/ReviewContainer";
import fetchService from "@/utils/services/FetchService";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${params.productId}`);
    }, 100);
  });

  return {
    title: `Kup ${title}`,
  };
};

export default async function ReviewPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await fetchService.getProduct(params.productId);

  return <ReviewContainer product={product} />;
}
