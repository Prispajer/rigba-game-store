import Header from "@/components/Interface/Shared/Header/Header";
import Navbar from "@/components/Interface/Shared/Navbar/Navbar";
import HomeUpComingGames from "@/components/Interface/Home/HomeUpComingGames";
import HomePopularGames from "@/components/Interface/Home/HomePopularGames";
import HomeBestGames from "@/components/Interface/Home/HomeBestGames";
import HomeTheLongestGames from "@/components/Interface/Home/HomeTheLongestGames";
import Categories from "@/components/Interface/Home/Categories";

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />
      {/* <HomeUpComingGames />
      <HomePopularGames />
      <HomeBestGames />
      <HomeTheLongestGames />
      <Categories /> */}
    </>
  );
}
