import { Metadata } from "next";
import OrderContainer from "@/features/auth/components/Auth/Orders/OrderContainer";

export const generateMetadata = async (data: {
  params: Promise<{ orderId: string }>;
}): Promise<Metadata> => {
  const params = await data.params;
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${params.orderId}`);
    }, 100);
  });

  return {
    title: `Order ${title}`,
  };
};

export default async function OrderPage(data: {
  params: Promise<{ orderId: string }>;
}) {
  const params = await data.params;

  return <OrderContainer params={params} />;
}
