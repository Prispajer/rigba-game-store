import AccountNavbar from "../../components/Auth/Account/AccountNavbar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AccountNavbar />
      {children}
    </div>
  );
}
