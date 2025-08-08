import Link from "next/link";
import Image from "next/image";

export default function AuthHeader() {
  return (
    <header>
      <Link
        className="flex items-center pl-3 pt-3 max-w-[200px]"
        href="/"
        aria-label="Go to homepage"
      >
        <Image
          src="/icons/logo.png"
          width={90}
          height={90}
          alt="logo"
          priority
        />
        <span className="text-[40px] text-white">RIGBA</span>
      </Link>
    </header>
  );
}
