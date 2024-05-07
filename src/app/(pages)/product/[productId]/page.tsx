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

async function getProduct(productId: string) {
  const res = await fetch(
    `https://api.rawg.io/api/games/${productId}?key=b3c85b14e19f4d618df8debc3d5b01b6`
  );
  const data = await res.json();
  return data;
}

async function getGameScreenshots(productId: string) {
  const res = await fetch(
    `https://api.rawg.io/api/games/${productId}/screenshots?key=b3c85b14e19f4d618df8debc3d5b01b6`
  );
  const data = await res.json();
  return data.results;
}

async function getGameGenres() {
  const res = await fetch(
    `https://api.rawg.io/api/genres?key=b3c85b14e19f4d618df8debc3d5b01b6`
  );
  const data = await res.json();
  return data;
}

async function getGameTags(productId: string) {
  const res = await fetch(
    `https://api.rawg.io/api/tags/${productId}?key=b3c85b14e19f4d618df8debc3d5b01b6`
  );
  const data = await res.json();
  return data;
}

export default async function productDetails({ params }: Props) {
  const [product, screenshots, genres, tags] = await Promise.all([
    getProduct(params.productId),
    getGameScreenshots(params.productId),
    getGameGenres(),
    getGameTags(params.productId),
  ]);

  console.log(genres);

  return (
    <div>
      <ProductContainer
        product={product}
        screenshots={screenshots}
        genres={genres}
        tags={tags}
      />
    </div>
  );
}
