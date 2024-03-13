export type NavLinks = {
  title: string;
  links: { category: string; items: { name: string; url: string }[] }[];
};

export const navLinks: NavLinks[] = [
  {
    title: "Gry",
    links: [
      {
        category: "Platforma",
        items: [
          { name: "Steam Gry", url: "/steam-games" },
          { name: "Xbox Gry", url: "/xbox-games" },
          { name: "PSN Gry", url: "/psn-games" },
          { name: "Nintendo Switch Gry", url: "/switch-games" },
          { name: "Origin Gry", url: "/origin-games" },
          { name: "Ubisoft Connect Gry", url: "/ubisoft-games" },
          { name: "Epic Games Gry", url: "/epic-games" },
          { name: "GOG Gry", url: "/gog-games" },
          { name: "Battle.net Gry", url: "/battle-games" },
          { name: "Przedsprzedaż", url: "/presale-games" },
          { name: "DLC", url: "/DLC" },
          { name: "Wszystkie", url: "/all-games" },
        ],
      },
      {
        category: "Popularne gatunki",
        items: [
          { name: "Singleplayer", url: "/singleplayer-games" },
          { name: "Multiplayer", url: "/multiplayer-games" },
          { name: "Akcji", url: "/action-games" },
          { name: "Pierwsza osoba", url: "/firstview-games" },
          { name: "Trzecia osoba", url: "/thirdperson-games" },
          { name: "Symulatory", url: "/simulators-games" },
          { name: "Sportowe", url: "/sport-games" },
          { name: "Co-op", url: "/coop-games" },
          { name: "Przygodowe", url: "/adventure-games" },
          { name: "Strategiczne", url: "/strategic-games" },
          { name: "FPS", url: "/fps-games" },
          { name: "Wyścigowe", url: "/racing-games" },
        ],
      },
      {
        category: "Niszowe gatunki",
        items: [
          { name: "Niezależne", url: "/indie-games" },
          { name: "RPG", url: "/rpg-games" },
          { name: "Horror", url: "/horror-games" },
          { name: "Wirtualna rzeczywistość", url: "/vr-games" },
          { name: "Platformowe", url: "/platformers-games" },
          { name: "Hack Slash", url: "/hackslash-games" },
          { name: "Bijatyki", url: "/battle-games" },
          { name: "MMO", url: "/mmo-games" },
          { name: "Przygodowe", url: "/adventure-games" },
          { name: "Łamigłówka", url: "/puzzle-games" },
          { name: "Point-CLick", url: "/point-games" },
          { name: "Arcade", url: "/arcade-games" },
        ],
      },
      {
        category: "Przeglądaj po cenach",
        items: [
          { name: "Gry poniżej PLN 4", url: "/games-under-4" },
          { name: "Gry poniżej PLN 8", url: "/games-under-8" },
          { name: "Gry poniżej PLN 10", url: "/games-under-10" },
          { name: "Gry poniżej PLN 20", url: "/games-under-20" },
          { name: "Gry poniżej PLN 50", url: "/games-under-50" },
          { name: "Gry poniżej PLN 100", url: "/games-under-100" },
          { name: "Gry powyżej PLN 100", url: "/games-above-100" },
        ],
      },
    ],
  },
  {
    title: "Karty do gier",
    links: [
      {
        category: "PC Gift Cards",
        items: [
          { name: "Steam Karty", url: "/steam-cards" },
          { name: "Fortnite V-Bucks", url: "/fortnite-vbucks" },
          { name: "Roblox Robux", url: "/roblox-robux" },
          { name: "Google Play Karty", url: "/google-play-cards" },
          { name: "Karty Razer Gold", url: "/razer-gold-cards" },
          { name: "Blizzard Karty", url: "/blizzard-cards" },
          { name: "Twitch Gift Cards", url: "/twitch-gift-cards" },
          { name: "Karty Discord", url: "/discord-cards" },
          { name: "Karty Karma Koin", url: "/karma-koin-cards" },
          { name: "IMVU Gift Cards", url: "/imvu-gift-cards" },
          { name: "Wszystkie", url: "/all-cards" },
        ],
      },
      {
        category: "Karty podarunkowe według ceny",
        items: [
          {
            name: "Karty podarunkowe poniżej PLN 20",
            url: "/gift-cards-below-20",
          },
          {
            name: "Karty podarunkowe poniżej PLN 50",
            url: "/gift-cards-below-50",
          },
          {
            name: "Karty podarunkowe poniżej PLN 100",
            url: "/gift-cards-below-100",
          },
          {
            name: "Karty podarunkowe za PLN 100 i więcej",
            url: "/gift-cards-above-100",
          },
        ],
      },
      {
        category: "Console Gift Cards",
        items: [
          { name: "PSN Karty", url: "/psn-cards" },
          { name: "Xbox Live Karty", url: "/xbox-cards" },
          { name: "Nintendo eShop Karty", url: "/nintendo-cards" },
        ],
      },
    ],
  },
  {
    title: "Xbox",
    links: [
      {
        category: "Xbox Gry",
        items: [
          { name: "Xbox Live Karty", url: "/xbox-cards" },
          { name: "Xbox Live Gold", url: "/xbox-live-gold" },
          { name: "Xbox Game Pass", url: "/xbox-game-pass" },
          { name: "Xbox Live subskrypcje", url: "/xbox-live-subscriptions" },
          { name: "Xbox Live DLCs", url: "/xbox-live-dlcs" },
          { name: "Wszystkie", url: "/all-xbox-games" },
        ],
      },
      {
        category: "Subskrypcje",
        items: [
          { name: "Game Pass 30", url: "/xbox-game-pass-30" },
          { name: "Game Pass 90", url: "/xbox-game-pass-90" },
          { name: "Game Pass 180", url: "/xbox-game-pass-180" },
          { name: "Game Pass PC 90", url: "/xbox-game-pass-pc-90" },
          { name: "Game Pass Core 30", url: "/xbox-game-pass-core-30" },
          { name: "Game Pass Core 90", url: "/xbox-game-pass-core-90" },
          { name: "Game Pass Core 180", url: "/xbox-game-pass-core-180" },
          { name: "Game Pass Core 365", url: "/xbox-game-pass-core-365" },
          { name: "Game Pass Ult. 30", url: "/xbox-game-pass-ult-30" },
          { name: "Game Pass Ult. 90", url: "/xbox-game-pass-ult-90" },
        ],
      },
      {
        category: "Karty podarunkowe wg krajów",
        items: [
          { name: "Xbox Live Polska", url: "/xbox-live-polska" },
          { name: "Xbox Live Europa", url: "/xbox-live-europa" },
          { name: "Xbox Live Stany Zjednoczone", url: "/xbox-live-usa" },
          { name: "Xbox Live Wielka Brytania", url: "/xbox-live-uk" },
        ],
      },
      {
        category: "Karty podarunkowe według ceny",
        items: [
          {
            name: "Karty podarunkowe poniżej PLN 20",
            url: "/xbox-gift-cards-below-20",
          },
          {
            name: "Karty podarunkowe poniżej PLN 50",
            url: "/xbox-gift-cards-below-50",
          },
          {
            name: "Karty podarunkowe poniżej PLN 100",
            url: "/xbox-gift-cards-below-100",
          },
          {
            name: "Karty podarunkowe za PLN 100 i więcej",
            url: "/xbox-gift-cards-above-100",
          },
        ],
      },
      {
        category: "Gry po cenach",
        items: [
          { name: "Gry poniżej PLN 20", url: "/xbox-games-below-20" },
          { name: "Gry poniżej PLN 50", url: "/xbox-games-below-50" },
          { name: "Gry poniżej PLN 100", url: "/xbox-games-below-100" },
          { name: "Gry za PLN 100 i więcej", url: "/xbox-games-above-100" },
        ],
      },
    ],
  },
  {
    title: "PSN",
    links: [
      {
        category: "Lista PSN",
        items: [
          { name: "PSN Gry", url: "/psn-games" },
          { name: "PSN Karty", url: "/psn-cards" },
          { name: "PS Plus subskrypcje", url: "/ps-plus-subscriptions" },
          { name: "PSN DLCs", url: "/psn-dlcs" },
          { name: "Wszystkie", url: "/all-psn-games" },
        ],
      },
      {
        category: "Karty podarunkowe wg krajów",
        items: [
          {
            name: "PlayStation karty podarunkowe Polska",
            url: "/psn-gift-cards-poland",
          },
          {
            name: "PlayStation karty podarunkowe US",
            url: "/psn-gift-cards-usa",
          },
          {
            name: "PlayStation karty podarunkowe UK",
            url: "/psn-gift-cards-uk",
          },
        ],
      },
      {
        category: "Subskrypcje po region",
        items: [
          {
            name: "PS Plus subskrypcje Polska",
            url: "/ps-plus-subscriptions-poland",
          },
          { name: "PS Plus subskrypcje US", url: "/ps-plus-subscriptions-usa" },
          { name: "PS Plus subskrypcje UK", url: "/ps-plus-subscriptions-uk" },
        ],
      },
      {
        category: "Gift cards by price",
        items: [
          {
            name: "Karty podarunkowe poniżej PLN 20",
            url: "/psn-gift-cards-below-20",
          },
          {
            name: "Karty podarunkowe poniżej PLN 50",
            url: "/psn-gift-cards-below-50",
          },
          {
            name: "Karty podarunkowe poniżej PLN 100",
            url: "/psn-gift-cards-below-100",
          },
          {
            name: "Karty podarunkowe za PLN 100 i więcej",
            url: "/psn-gift-cards-above-100",
          },
        ],
      },
    ],
  },
  {
    title: "Nintendo",
    links: [
      {
        category: "Lista Nintendo",
        items: [
          { name: "Nintendo Switch Gry", url: "/nintendo-games" },
          {
            name: "Nintendo eShop Karty",
            url: "/nintendo-gift-cards",
          },
          {
            name: "Nintendo Online subskrypcje",
            url: "/nintendo-subscritpions",
          },

          { name: "Wszystkie", url: "/all-nintendo-switch-games" },
        ],
      },
      {
        category: "Karty podarunkowe według regionu",
        items: [
          {
            name: "Nintendo karty podarunkowe Polska",
            url: "/nintendo-gift-cards-poland",
          },
          {
            name: "Nintendo eShop karty Europe",
            url: "/nintendo-eshop-cards-europe",
          },
          { name: "Nintendo eShop karty UK", url: "/nintendo-eshop-cards-uk" },
          { name: "Nintendo eShop karty NA", url: "/nintendo-eshop-cards-na" },
        ],
      },
      {
        category: "Subskrypcje po region",
        items: [
          {
            name: "Nintendo Online subskrypcje Europe",
            url: "/nintendo-online-subscriptions-europe",
          },
          {
            name: "Nintendo Online subskrypcje US",
            url: "/nintendo-online-subscriptions-usa",
          },
        ],
      },
      {
        category: "Przegadaj po cenach",
        items: [
          { name: "Gry poniżej PLN 50", url: "/nintendo-games-below-50" },
          { name: "Gry poniżej PLN 100", url: "/nintendo-games-below-100" },
          { name: "Gry za PLN 100 i więcej", url: "/nintendo-games-above-100" },
        ],
      },
    ],
  },
];
