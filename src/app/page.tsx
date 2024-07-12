import Header from "@/components/Interface/Shared/Header/Header";
import Navbar from "@/components/Interface/Shared/Navbar/Navbar";
import HomeSortableGameList from "@/components/Interface/Home/HomeSortableGameList";
import HomeCategories from "@/components/Interface/Home/HomeCategories";

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />
      <HomeSortableGameList
        header="Top rated games"
        ordering="-rating"
        background="bg-primaryColor"
      />
      <HomeSortableGameList
        header="Future premieres"
        ordering="released"
        background="bg-secondaryColor"
      />
      <HomeSortableGameList
        header="Favorite games"
        ordering="-added"
        background="bg-primaryColor"
      />
      <HomeSortableGameList
        header="Latest games"
        ordering="-created"
        background="bg-secondaryColor"
      />
      <HomeSortableGameList
        header="Best metacritic games"
        ordering="-metacritic"
        background="bg-primaryColor"
      />
      <HomeCategories />
    </>
  );
}
