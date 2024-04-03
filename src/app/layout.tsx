import { Metadata } from "next";
import { workbench } from "../utils/helpers/fonts";
import "./globals.css";
import GlobalProvider from "@/redux/GlobalProvider";

export const metadata: Metadata = {
  title: "Buy, browse, learn everything about games | RIGBA",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GlobalProvider>
        <body>{children}</body>
      </GlobalProvider>
    </html>
  );
}
