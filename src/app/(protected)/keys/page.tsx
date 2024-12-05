import AccountSidebar from "@/components/Interface/Shared/Sidebars/AccountSidebar";
import AccountNavbarContainer from "@/components/Interface/Navbar/AccountNavbarContainer";
import KeysContainer from "@/components/Auth/Keys/KeysContainer";

export const metadata = {
  title: "Keys | RIGBA",
};

export default function KeysPage() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[240px,calc(100%-240px)] h-[calc(100vh-76px)]">
      <AccountSidebar />
      <AccountNavbarContainer />
      <KeysContainer />
    </section>
  );
}
