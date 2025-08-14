import AuthFooter from "../AuthLayout/AuthFooter";
import CheckoutHeader from "./CheckoutHeader";

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CheckoutHeader />
      <main>{children}</main>
    </div>
  );
}
