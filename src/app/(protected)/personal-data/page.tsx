import AccountSidebar from "@/components/Interface/Shared/Sidebars/AccountSidebar";
import AccountNavbarContainer from "@/components/Interface/Navbar/AccountNavbarContainer";
import PersonalDataContainer from "@/components/Auth/Settings/PersonalDataContainer";

export const metadata = {
  title: "Change Personal Data | RIGBA",
};

export default function PersonalDataPage() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[240px,calc(100%-240px)] h-[calc(100vh-76px)]">
      <AccountSidebar />
      <AccountNavbarContainer />
      <PersonalDataContainer />
    </section>
  );
}
