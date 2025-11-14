import type ApiProductDetails from "@/features/products/types/api/apiProductDetails";
import type UserCartItem from "@/features/cart/types/userCart/userCartItem";
import type LocalStorageCartProduct from "@/features/cart/types/localStorageCart/localStorageCartProduct";

export function generateRandomPrice(): number {
  const minValue = 0;
  const maxValue = 300;
  const precision = 100;

    return Math.floor(Math.random() * (maxValue - minValue + 1) * precision) /
    precision;
}

export async function assignPricesToExternalGames(
  externalGames: ApiProductDetails[],
  existingGames: ApiProductDetails[]
): Promise<ApiProductDetails[]> {
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
  productsArray: UserCartItem[] | LocalStorageCartProduct[]
) => {
  return productsArray
    .reduce((total: number, product) => {
      const price =
        "productsInformations" in product
          ? product.productsInformations.price
          : product.price;
      const quantity = product.quantity || 1;
      return total + (price as number) * quantity;
    }, 0)
    .toFixed(2);
};

