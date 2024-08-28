"use client";
import AccountSidebar from "@/components/Interface/Shared/Sidebars/AccountSidebar";
import AccountNavbarContainer from "@/components/Interface/Navbar/AccountNavbarContainer";
import ChangePasswordContainer from "@/components/Auth/Settings/ChangePasswordContainer";

export default function OrdersPage() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[240px,calc(100%-240px)] h-[calc(100vh-76px)]">
      <AccountSidebar />
      <AccountNavbarContainer />
      <ChangePasswordContainer />
    </section>
  );
}
