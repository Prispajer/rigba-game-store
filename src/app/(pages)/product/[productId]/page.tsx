import fetchService from "@/utils/classes/FetchService";
import { Metadata } from "next";
import ProductContainer from "@/components/Interface/Product/ProductContainer";

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
  try {
    const [product, screenshots, genres, requirements, gameGenres] =
      await Promise.all([
        fetchService.getGame(params.productId),
        fetchService.getGameScreenshots(params.productId),
        fetchService.getGamesGenres(30),
        fetchService.getGameRequirements(params.productId),
        fetchService.getGameGenres("Soulcalibur (1998)"),
      ]);

    console.log(params.productId);

    return (
      <ProductContainer
        product={product}
        screenshots={screenshots}
        genres={genres}
        requirements={requirements}
        gameGenres={gameGenres}
      />
    );
  } catch (error) {
    console.error("An error occurred while fetching product details:", error);
    return (
      <div>
        <h1>Error loading product details</h1>
        <p>
          There was a problem loading the product details. Please try again
          later.
        </p>
      </div>
    );
  }
}
