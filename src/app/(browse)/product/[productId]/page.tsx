import { Metadata } from "next";
import ProductContainer from "@/features/products/components/Product/ProductContainer";
import fetchService from "@/services/FetchService";

export const generateMetadata = async (data: {
  params: { productId: string };
}): Promise<Metadata> => {
  const product = await fetchService.getProduct(data.params.productId);

  return {
    title: `Buy ${product.name}`,
  };
};

export default async function ProductPage(data: {
  params: Promise<{ productId: string }>;
}) {
  const params = await data.params;

  const [product, screenshots] = await Promise.all([
    fetchService.getProduct(params.productId),
    fetchService.getScreenshotsForProduct(params.productId),
  ]);

  return <ProductContainer product={product} screenshots={screenshots} />;
}
