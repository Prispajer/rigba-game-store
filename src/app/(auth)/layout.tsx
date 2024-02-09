import { workbench } from "../../utils/fonts";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={workbench.className}>{children}</body>
    </html>
  );
}
