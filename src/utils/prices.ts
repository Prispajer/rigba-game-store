import { GameAPIResponse, LocalCart, UserProduct } from "../types/types";

export function generateRandomPrice(): number {
  const minValue = 0;
  const maxValue = 300;
  const precision = 100;

  const randomValue =
    Math.floor(Math.random() * (maxValue - minValue + 1) * precision) /
    precision;
  return randomValue;
}

export async function assignPricesToExternalGames(
  externalGames: GameAPIResponse[],
  existingGames: GameAPIResponse[]
): Promise<GameAPIResponse[]> {
  const existingGamesPriceMap = new Map<number, number>(
    existingGames.map((game) => [
      game.id as number,
      (game.price as number) ?? generateRandomPrice(),
    ])
  );

  return externalGames.map((game) => ({
    ...game,
    price:
      existingGamesPriceMap.get(game.id as number) ?? generateRandomPrice(),
  }));
}

export const calculateTotalPrice = (
  productsArray: LocalCart[] | UserProduct[]
) => {
  return productsArray
    .reduce((total: number, product) => {
      const price =
        "productsInformations" in product
          ? product.productsInformations.price
          : product.price;
      const quantity = product.quantity || 1;
      return total + price * quantity;
    }, 0)
    .toFixed(2);
};
