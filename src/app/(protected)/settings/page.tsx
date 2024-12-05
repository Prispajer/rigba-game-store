import AccountSidebar from "@/components/Interface/Shared/Sidebars/AccountSidebar";
import AccountNavbarContainer from "@/components/Interface/Navbar/AccountNavbarContainer";
import SettingsContainer from "@/components/Auth/Settings/SettingsContainer";

export const metadata = {
  title: "Settings | RIGBA",
};

export default function SettingsPage() {
  return (
    <section className="relative grid grid-cols-1 md:grid-cols-[240px,calc(100%-240px)] h-[calc(100vh-76px)]">
      <AccountSidebar />
      <AccountNavbarContainer />
      <SettingsContainer />
    </section>
  );
}
