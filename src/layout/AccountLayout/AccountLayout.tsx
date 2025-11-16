import React from "react";
import AccountSidebarMobile from "@/components/Interface/Shared/Sidebars/AccountSidebarMobile";
import AccountHeader from "./AccountHeader";
import AccountSidebar from "./AccountSidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AccountHeader />
      <section className="relative grid grid-cols-1 md:grid-cols-[240px,calc(100%-240px)] h-[calc(100vh-76px)] bg-[#e9eff4]">
        <AccountSidebar />
        <AccountSidebarMobile />
        <main>{children}</main>
      </section>
    </>
  );
}
