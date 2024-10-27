import { Metadata } from "next";
import ReviewContainer from "@/components/Interface/Review/ReviewContainer";
import fetchService from "@/services/FetchService";

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${params.productId}`);
    }, 100);
  });

  return {
    title: `Kup ${title}`,
  };
};

export default async function ReviewPage(
  props: {
    params: Promise<{ productId: string }>;
  }
) {
  const params = await props.params;
  const product = await fetchService.getProduct(params.productId);

  return <ReviewContainer product={product} />;
}
