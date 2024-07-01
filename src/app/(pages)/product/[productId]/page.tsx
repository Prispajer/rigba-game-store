import { Metadata } from "next";
import ProductContainer from "@/components/Interface/Product/ProductContainer";
import fetchService from "@/utils/classes/fetchService";

type Props = {
  params: {
    productId: string;
  };
};

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

export default async function productDetails({ params }: Props) {
  const [product, screenshots, genres, tags, requirements] = await Promise.all([
    fetchService.getProduct(params.productId),
    fetchService.getGameScreenshots(params.productId),
    fetchService.getGameGenres(),
    fetchService.getGameTags(params.productId),
    fetchService.getGameRequirements(params.productId),
  ]);

  return (
    <ProductContainer
      product={product}
      screenshots={screenshots}
      genres={genres}
      tags={tags}
      requirements={requirements}
    />
  );
}
