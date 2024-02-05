import Image from "next/image";

export default function HomeContainer() {
  return (
    <>
      <main className="bg-[#296CA6] w-full h-full">
        <div className="flex items-center justify-center">
          <Image
            src="/images/banner.jpg"
            alt="banner"
            width={500}
            height={400}
            objectFit="cover"
          ></Image>
        </div>
      </main>
    </>
  );
}
