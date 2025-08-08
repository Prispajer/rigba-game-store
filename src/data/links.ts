export type NavLinks = {
  title: string;
  link: string;
  links: { category: string; items: { name: string; url: string }[] }[];
};

export const navLinks: NavLinks[] = [
  {
    title: "Games",
    link: "/filters",
    links: [
      {
        category: "Platforms",
        items: [
          { name: "PC Games", url: "/filters?platforms=4%2C6%2C5" },
          {
            name: "PlayStation Games",
            url: "/filters?platforms=187%2C18%2C16%2C15%2C27%2C19%2C17",
          },
          { name: "Xbox Games", url: "/filters?platforms=186%2C1%2C14%2C80" },
          {
            name: "Nintendo Games",
            url: "/filters?platforms=7%2C8%2C9%2C13%2C83%2C10%2C11%2C105%2C24%2C43%2C26%2C79%2C49",
          },
          { name: "iOS Games", url: "/filters?platforms=3" },
          { name: "Android Games", url: "/filters?platforms=21" },
          {
            name: "Atari Games",
            url: "/filters?platforms=28%2C23%2C31%2C25%2C22%2C34%2C46%2C50",
          },
          {
            name: "Classic Macintosh Games",
            url: "/filters?platforms=55",
          },
          { name: "Apple II Games", url: "/filters?platforms=41" },
          { name: "Commodore / Amiga Games", url: "/filters?platforms=166" },
        ],
      },
      {
        category: "Popular Genres",
        items: [
          { name: "Action", url: "/filters?genres=4" },
          { name: "Simulation", url: "/filters?genres=14" },
          { name: "Adventure", url: "/filters?genres=3" },
          { name: "Strategy", url: "/filters?genres=10" },
          { name: "Shooter", url: "/filters?genres=2" },
          { name: "Racing", url: "/filters?genres=1" },
          { name: "Massively Multiplayer", url: "/filters?genres=59" },
          { name: "Sports", url: "/filters?genres=15" },
        ],
      },
      {
        category: "Niche Genres",
        items: [
          { name: "Indie", url: "/filters?genres=51" },
          { name: "RPG", url: "/filters?genres=5" },
          { name: "Casual", url: "/filters?genres=40" },
          { name: "Puzzle", url: "/filters?genres=7" },
          { name: "Arcade", url: "/filters?genres=11" },
          { name: "Platformer", url: "/filters?genres=83" },
          { name: "Fighting", url: "/filters?genres=6" },
          { name: "Family", url: "/filters?genres=19" },
          { name: "Board Games", url: "/filters?genres=28" },
          { name: "Card", url: "/filters?genres=17" },
          { name: "Educational", url: "/filters?genres=34" },
        ],
      },
      {
        category: "Browse By Prices",
        items: [
          { name: "Games Under 4", url: "/games-under-4" },
          { name: "Games Under 8", url: "/games-under-8" },
          { name: "Games Under 10", url: "/games-under-10" },
          { name: "Games Under 20", url: "/games-under-20" },
          { name: "Games Under 50", url: "/games-under-50" },
          { name: "Games Under 100", url: "/games-under-100" },
          { name: "Games Above 100", url: "/games-above-100" },
        ],
      },
    ],
  },
  {
    title: "PlayStation",
    link: "/filters?platforms=187%2C18%2C16%2C15%2C27%2C19%2C17",
    links: [
      {
        category: "PlayStation Platforms",
        items: [
          { name: "PlayStation", url: "/filters?platforms=27" },
          {
            name: "PlayStation 2",
            url: "/filters?platforms=15",
          },
          {
            name: "PlayStation 3",
            url: "/filters?platforms=16",
          },
          {
            name: "PlayStation 4",
            url: "/filters?platforms=18",
          },
          {
            name: "PlayStation 5",
            url: "/filters?platforms=187",
          },
          {
            name: "PS Vita",
            url: "/filters?platforms=19",
          },
          {
            name: "PSP",
            url: "/filters?platforms=17",
          },
        ],
      },
      {
        category: "Browse By Prices",
        items: [
          {
            name: "PlayStation Games Under 20",
            url: "/filters?platforms=17",
          },
          {
            name: "PlayStation Games Under 50",
            url: "/filters?platforms=17",
          },
          {
            name: "PlayStation Games Under 100",
            url: "/filters?platforms=17",
          },
          {
            name: "PlayStation Games Above 100",
            url: "/filters?platforms=17",
          },
        ],
      },
    ],
  },
  {
    title: "Xbox",
    link: "/filters?platforms=186%2C1%2C14%2C80",
    links: [
      {
        category: "Xbox Platforms",
        items: [
          { name: "Xbox", url: "/filters?platforms=80" },
          { name: "Xbox 360", url: "/filters?platforms=14" },
          { name: "Xbox One", url: "/filters?platforms=1" },
          { name: "Xbox Series X/S", url: "/filters?platforms=186" },
        ],
      },
      {
        category: "Browse By Prices",
        items: [
          {
            name: "Xbox Games Under 20",
            url: "/filters?platforms=186%2C1%2C14%2C80",
          },
          {
            name: "Xbox Games Under 50",
            url: "/filters?platforms=186%2C1%2C14%2C80",
          },
          {
            name: "Xbox Games Under 100",
            url: "/filters?platforms=186%2C1%2C14%2C80",
          },
          {
            name: "Xbox Games Above 100",
            url: "/filters?platforms=186%2C1%2C14%2C80",
          },
        ],
      },
    ],
  },
  {
    title: "Nintendo",
    link: "/filters?platforms=7%2C8%2C9%2C13%2C83%2C10%2C11%2C105%2C24%2C43%2C26%2C79%2C49",
    links: [
      {
        category: "Nintendo Platforms",
        items: [
          {
            name: "Nintendo Switch",
            url: "/filters?platforms=7",
          },
          { name: "Nintendo 3DS", url: "/filters?platforms=8" },
          {
            name: "Nintendo DS",
            url: "/filters?platforms=9",
          },
          {
            name: "Nintendo DSi",
            url: "/filters?platforms=13",
          },
          { name: "Nintendo 64", url: "/filters?platforms=83" },
          { name: "Nintendo Wii", url: "/filters?platforms=11" },
          { name: "Nintendo Wii U", url: "/filters?platforms=10" },
          { name: "GameCube", url: "/filters?platforms=105" },
          { name: "Game Boy Advance", url: "/filters?platforms=24" },
          { name: "Game Boy Color", url: "/filters?platforms=43" },
          { name: "Game Boy", url: "/filters?platforms=26" },
          { name: "SNES", url: "/filters?platforms=79" },
          { name: "NES", url: "/filters?platforms=49" },
        ],
      },
      {
        category: "Browse By Prices",
        items: [
          {
            name: "Nintendo Games Under 20",
            url: "/filters?platforms=186%2C1%2C14%2C80",
          },
          {
            name: "Nintendo Games Under 50",
            url: "/filters?platforms=7%2C8%2C9%2C13%2C83%2C10%2C11%2C105%2C24%2C43%2C26%2C79%2C49",
          },
          {
            name: "Nintendo Games Under 100",
            url: "/filters?platforms=7%2C8%2C9%2C13%2C83%2C10%2C11%2C105%2C24%2C43%2C26%2C79%2C49",
          },
          {
            name: "Nintendo Games Above 100",
            url: "/filters?platforms=7%2C8%2C9%2C13%2C83%2C10%2C11%2C105%2C24%2C43%2C26%2C79%2C49",
          },
        ],
      },
    ],
  },
  {
    title: "Atari",
    link: "/filters?platforms=28%2C23%2C31%2C25%2C22%2C34%2C46%2C50",
    links: [
      {
        category: "Atari Platforms",
        items: [
          { name: "Atari 7800", url: "/filters?platforms=28" },
          { name: "Atari 5200", url: "/filters?platforms=31" },
          { name: "Atari 2600", url: "/filters?platforms=23" },
          { name: "Atari Flashback", url: "/filters?platforms=22" },
          { name: "Atari 8-bit", url: "/filters?platforms=25" },
          { name: "Atari ST", url: "/filters?platforms=34" },
          { name: "Atari Lynx", url: "/filters?platforms=46" },
          { name: "Atari XEGS", url: "/filters?platforms=50" },
        ],
      },
      {
        category: "Browse By Prices",
        items: [
          { name: "Atari Games Under 20", url: "/filters?platforms=286" },
          { name: "Atari Games Under 50", url: "/filters?platforms=286" },
          { name: "Atari Games Under 100", url: "/filters?platforms=286" },
          { name: "Atari Games Above 100", url: "/filters?platforms=286" },
        ],
      },
    ],
  },
];
