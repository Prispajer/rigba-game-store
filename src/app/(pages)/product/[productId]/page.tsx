import { Metadata } from "next";
import ProductContainer from "@/components/Interface/Product/ProductContainer";
import fetchService from "@/services/FetchService";

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

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const [product, screenshots] = await Promise.all([
    fetchService.getProduct(params.productId),
    fetchService.getScreenshotsForProduct(params.productId),
  ]);

  return <ProductContainer product={product} screenshots={screenshots} />;
}
