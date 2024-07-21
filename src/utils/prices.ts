import { GameAPIResponse } from "./helpers/types";

export function generateRandomValue(): number {
  const minValue = 0;
  const maxValue = 300;
  const precision = 100;

  const randomValue =
    Math.floor(Math.random() * (maxValue - minValue + 1) * precision) /
    precision;
  return randomValue;
}

export async function getGamesWithRandomPrices(
  games: GameAPIResponse[]
): Promise<GameAPIResponse[]> {
  return games.map((game) => ({
    ...game,
    price: generateRandomValue(),
  }));
}
