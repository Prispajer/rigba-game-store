import { GameAPIResponse, Product, UserCart } from "./helpers/types";

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
    existingGames.map((game) => [
      game.id as number,
      (game.price as number) ?? generateRandomValue(),
    ])
  );

  return games.map((game) => ({
    ...game,
    price: existingGamesMap.get(game.id as number) ?? generateRandomValue(),
  }));
}

export const calculateTotalPrice = (productsArray: Product[] | UserCart[]) => {
  return productsArray
    .reduce((total: number, product) => {
      const price = product.productsInformations?.price || product.price;
      const quantity = product.quantity || 1;
      return total + price * quantity;
    }, 0)
    .toFixed(2);
};
