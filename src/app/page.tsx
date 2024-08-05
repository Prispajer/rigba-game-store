import HeaderContainer from "@/components/Interface/Header/HeaderContainer";
import NavbarContainer from "@/components/Interface/Navbar/NavbarContainer";
import HomeSortableGameList from "@/components/Interface/Home/HomeSortableGameList";
import HomeCategories from "@/components/Interface/Home/HomeCategories";

export default function Home() {
  return (
    <>
      <HeaderContainer />
      <NavbarContainer />
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
