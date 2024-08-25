"use client";
import AccountSidebar from "@/components/Interface/Shared/Sidebars/AccountSidebar";
import KeysContainer from "@/components/Auth/Keys/KeysContainer";

export default function KeysPage() {
  return (
    <section className="grid grid-cols-[240px,calc(100%-240px)] h-[calc(100vh-76px)]">
      <AccountSidebar />
      <KeysContainer />
    </section>
  );
}
