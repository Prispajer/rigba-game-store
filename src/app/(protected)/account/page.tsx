"use client";
import AccountContainer from "@/components/Auth/Account/AccountContainer";
import AccountNavbarContainer from "@/components/Interface/Navbar/AccountNavbarContainer";
import AccountSidebar from "@/components/Interface/Shared/Sidebars/AccountSidebar";

export default function AccountPage() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[240px,calc(100%-240px)]">
      <AccountSidebar />
      <AccountNavbarContainer />
      <AccountContainer />
    </section>
  );
}
