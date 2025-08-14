import LoadingAnimation from "@/components/Interface/Shared/Animations/LoadingAnimation";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-76px)] bg-[#e9eff4]">
      <LoadingAnimation />
    </div>
  );
}
