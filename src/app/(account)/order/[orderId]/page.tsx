import { Metadata } from "next";
import OrderDetailsContainer from "@/features/auth/components/Auth/Orders/OrderDetailsContainer";

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

  return <OrderDetailsContainer params={params} />;
}
