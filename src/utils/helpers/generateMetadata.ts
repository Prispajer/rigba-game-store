import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: {
    productId: string;
  };
}): Promise<Metadata> => {
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`iPhone ${params.productId}`);
    }, 100);
  });
  return {
    title: `Product ${title}`,
  };
};
