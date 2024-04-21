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
      resolve(`iPhone ${params.productId}`);
    }, 100);
  });
  return {
    title: `Product ${title}`,
  };
};

export default function productDetails({ params }: Props) {
  return (
    <div>
      <ProductContainer />;
    </div>
  );
}
