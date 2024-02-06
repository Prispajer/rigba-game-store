export type GeneralLinks = {
  name: string;
  link: string;
};

export type SpecificLinks = {
  title: string;
  specificLinks: { name: string; link: string }[];
};

export const generalLinks: GeneralLinks[] = [
  { name: "Sklep", link: "/sklep" },
  { name: "Gry", link: "/gry" },
  { name: "Karty do gier", link: "/karty-do-gier" },
  { name: "eKarty", link: "/ekarty" },
  { name: "Xbox", link: "/xbox" },
  { name: "PSN", link: "/psn" },
  { name: "Nintendo", link: "/nintendo" },
];

export const specificLinks: SpecificLinks[] = [
  {
    title: "Platforma",
    specificLinks: [
      { name: "Steam Gry", link: "/steam" },
      { name: "Xbox Gry", link: "/xbox" },
      { name: "PSN Gry", link: "/psn" },
      { name: "Nintendo Switch Gry", link: "/nintendo" },
      { name: "Origin Gry", link: "/origin" },
      { name: "Ubisoft Connect Gry", link: "/ubisoft" },
      { name: "Epic Games Gry", link: "/epic" },
      { name: "GOG Gry", link: "/gog" },
      { name: "Battle.net Gry", link: "/battlenet" },
      { name: "Przedsprzedaż", link: "/przedsprzedaz" },
      { name: "DLC", link: "/dlc" },
      { name: "Wszystkie", link: "/wszystkie" },
    ],
  },
];
