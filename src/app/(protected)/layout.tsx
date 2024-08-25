import Link from "next/link";
import AccountNavbar from "../../components/Auth/Account/AccountNavbar";
import AccountSidebar from "@/components/Interface/Shared/Sidebars/AccountSidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <>
          <AccountNavbar />
          {children}
        </>
      </body>
    </html>
  );
}
