import { Metadata } from "next";
import ProductContainer from "@/components/Interface/Product/ProductContainer";
import fetchService from "@/services/FetchService";

export const generateMetadata = async (data: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> => {
  const params = await data.params;
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${params.productId}`);
    }, 100);
  });

  return {
    title: `Buy ${title}`,
  };
};

export default async function ProductPage(data: {
  params: Promise<{ productId: string }>;
}) {
  const params = await data.params;

  const product = await fetchService.getProduct(params.productId);

  const screenshots = product.screenshots;

  return <ProductContainer product={product} screenshots={screenshots} />;
}
