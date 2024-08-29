"use client";
import AccountSidebar from "@/components/Interface/Shared/Sidebars/AccountSidebar";
import AccountNavbarContainer from "@/components/Interface/Navbar/AccountNavbarContainer";
import OrderContainer from "@/components/Auth/Orders/OrderContainer";

export default function OrderPage() {
  return (
    <section className="relative grid grid-cols-1 md:grid-cols-[240px,calc(100%-240px)] h-[calc(100vh-76px)]">
      <AccountSidebar />
      <AccountNavbarContainer />
      <OrderContainer />
    </section>
  );
}
