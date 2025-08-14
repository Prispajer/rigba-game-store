import { Metadata } from "next";
import CheckoutLayout from "@/layout/CheckoutLayout/CheckoutLayout";

export const metadata: Metadata = {
  title: "Your cart | RIGBA",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CheckoutLayout>{children}</CheckoutLayout>;
}
