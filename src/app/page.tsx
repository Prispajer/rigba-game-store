import Header from "@/components/Interface/Shared/Header/Header";
import Navbar from "@/components/Interface/Shared/Navbar/Navbar";
import HomeBestRatingGames from "@/components/Interface/Home/HomeBestRatingGames";
import HomePopularGames from "@/components/Interface/Home/HomePopularGames";
import HomeBestGames from "@/components/Interface/Home/HomeBestGames";
import HomeTheLongestGames from "@/components/Interface/Home/HomeTheLongestGames";
import HomeCategories from "@/components/Interface/Home/HomeCategories";

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />
      <HomeBestRatingGames />
      <HomePopularGames />
      <HomeBestGames />
      <HomeTheLongestGames />
      <HomeBestGames />
      <HomeCategories />
    </>
  );
}
