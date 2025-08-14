import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between min-w-full min-h-[100vh] h-max lg:bg-[#122339] bg-primaryColor">
      <div className="flex flex-col justify-between flex-1 min-h-[100vh] h-max">
        <AuthHeader />
        <main>{children}</main>
        <AuthFooter />
      </div>
    </div>
  );
}
