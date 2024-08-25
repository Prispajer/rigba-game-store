"use client";
import AccountSidebar from "@/components/Interface/Shared/Sidebars/AccountSidebar";
import OrdersContainer from "@/components/Auth/Orders/OrdersContainer";

export default function OrdersPage() {
  return (
    <section className="grid grid-cols-[240px,calc(100%-240px)] h-[calc(100vh-76px)]">
      <AccountSidebar />
      <OrdersContainer />
    </section>
  );
}
