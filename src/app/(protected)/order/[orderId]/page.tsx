import { Metadata } from "next";
import AccountSidebar from "@/components/Interface/Shared/Sidebars/AccountSidebar";
import AccountNavbarContainer from "@/components/Interface/Navbar/AccountNavbarContainer";
import OrderContainer from "@/components/Auth/Orders/OrderContainer";

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

  return (
    <section className="relative grid grid-cols-1 md:grid-cols-[240px,calc(100%-240px)] h-[calc(100vh-76px)]">
      <AccountSidebar />
      <AccountNavbarContainer />
      <OrderContainer params={params} />
    </section>
  );
}
