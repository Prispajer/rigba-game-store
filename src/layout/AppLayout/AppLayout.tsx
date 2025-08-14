import AppHeader from "./AppHeader";
import AppNavbar from "./AppNavbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppHeader />
      <AppNavbar />
      <main>{children}</main>
    </div>
  );
}
