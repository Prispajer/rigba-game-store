import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Your cart | RIGBA",
  description: "Generated by create next app",
};

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
