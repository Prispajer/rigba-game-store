import { Metadata } from "next";
import { workbench } from "@/utils/helpers/fonts";
import GlobalProvider from "@/redux/GlobalProvider";
import Header from "@/components/Interface/Shared/Header/Header";
import Navbar from "@/components/Interface/Shared/Navbar/Navbar";

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
      <body>
        <Header />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
