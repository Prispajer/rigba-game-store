import { Metadata } from "next";
import ProductContainer from "@/components/Interface/Product/ProductContainer";
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

export default async function ProductPage(
  props: {
    params: Promise<{ productId: string }>;
  }
) {
  const params = await props.params;
  const [product, screenshots] = await Promise.all([
    fetchService.getProduct(params.productId),
    fetchService.getScreenshotsForProduct(params.productId),
  ]);

  return <ProductContainer product={product} screenshots={screenshots} />;
}
