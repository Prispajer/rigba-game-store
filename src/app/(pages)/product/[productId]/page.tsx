import { Metadata } from "next";
import ProductContainer from "@/components/Interface/Product/ProductContainer";
import { ApiService } from "@/utils/classes/apiService";
import { IApiService } from "@/utils/interfaces/iApiService";

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
  let apiService: IApiService;
  apiService = new ApiService();

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
