import { Metadata } from "next";
import ProductContainer from "@/components/Interface/Product/ProductContainer";
import AddToWishList from "@/components/Interface/Shared/Products/AddToWishList";
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
  const [product, screenshots, genres, requirements] = await Promise.all([
    fetchService.getGame(params.productId),
    fetchService.getGameScreenshots(params.productId),
    fetchService.getGamesGenres(30),
    fetchService.getGameRequirements(params.productId),
  ]);

  return (
    <>
      <ProductContainer
        product={product}
        screenshots={screenshots}
        genres={genres}
        requirements={requirements}
      />
    </>
  );
}
