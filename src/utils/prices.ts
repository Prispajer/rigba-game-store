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
  games: GameAPIResponse[],
  existingGames: GameAPIResponse[]
): Promise<GameAPIResponse[]> {
  const existingGamesMap = new Map<number, number>(
    existingGames.map((game) => [game.id, game.price ?? generateRandomValue()])
  );

  return games.map((game) => ({
    ...game,
    price: existingGamesMap.get(game.id) ?? generateRandomValue(),
  }));
}
