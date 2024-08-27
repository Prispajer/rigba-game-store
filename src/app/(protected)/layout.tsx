import AccountNavbar from "../../components/Auth/Account/AccountNavbar";

export default function AccountLayout({
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
