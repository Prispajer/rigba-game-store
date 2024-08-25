"use client";
import AccountContainer from "@/components/Auth/Account/AccountContainer";
import AccountSidebar from "@/components/Interface/Shared/Sidebars/AccountSidebar";

export default function AccountPage() {
  return (
    <section className="grid grid-cols-[240px,calc(100%-240px)] h-[calc(100vh-76px)]">
      <AccountSidebar />
      <AccountContainer />
    </section>
  );
}
