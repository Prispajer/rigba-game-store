import { Metadata } from "next";
import ProductContainer from "@/components/Interface/Product/ProductContainer";
import { FetchService } from "@/utils/classes/fetchService";
import { IFetchService } from "@/utils/interfaces/iFetchService";

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
  const apiService: IFetchService = new FetchService();

  const [product, screenshots, genres, tags] = await Promise.all([
    apiService.getProduct(params.productId),
    apiService.getGameScreenshots(params.productId),
    apiService.getGameGenres(),
    apiService.getGameTags(params.productId),
  ]);

  return (
    <ProductContainer
      product={product}
      screenshots={screenshots}
      genres={genres}
      tags={tags}
    />
  );
}
