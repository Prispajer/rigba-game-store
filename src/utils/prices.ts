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

export const processReviews = (
  reviews: UserReview[]
): Array<{ count: number; id: number; percent: number; title: string }> => {
  const groupedReviews: Record<
    string,
    { count: number; id: number; percent: number; title: string }
  > = {};

  reviews.forEach((review) => {
    if (review.rating.rating && review.rating.percent !== undefined) {
      if (groupedReviews[review.rating.rating]) {
        groupedReviews[review.rating.rating].count += 1;
      } else {
        groupedReviews[review.rating.rating] = {
          count: 1,
          id: review.rating.rating,
          title: review.rating.title,
          percent: review.rating.percent,
        };
      }
    }
  });

  Object.keys(groupedReviews).forEach((key) => {
    const reviewData = groupedReviews[key];
    reviewData.percent = Math.floor((reviewData.count / reviews.length) * 100);
  });

  return Object.values(groupedReviews);
};

export const mergeReviewData = (
  processedReviews: Array<{
    count: number;
    id: number;
    title: string;
    percent: number;
  }>,
  apiReviews: Array<{
    id: number;
    title: string;
    count: number;
    percent: number;
  }>
): Array<{ count: number; id: number; title: string; percent: number }> => {
  const processedReviewsMap = new Map<
    number,
    { count: number; id: number; title: string; percent: number }
  >();

  processedReviews.forEach((review) => {
    processedReviewsMap.set(review.id, { ...review });
  });

  const processedReviewsCountSummary = processedReviews.reduce(
    (acc, review) => acc + review.count,
    0
  );

  const apiReviewsCountSummary = apiReviews.reduce(
    (acc, review) => acc + review.count,
    0
  );

  apiReviews.forEach((apiReview) => {
    const existingReview = processedReviewsMap.get(apiReview.id);

    if (existingReview) {
      existingReview.count += apiReview.count;
    } else {
      processedReviewsMap.set(apiReview.id, {
        count: apiReview.count,
        id: apiReview.id,
        title:
          apiReview.title.charAt(0).toUpperCase() + apiReview.title.slice(1),
        percent: apiReview.percent,
      });
    }
  });

  processedReviewsMap.forEach((review) => {
    review.percent = Math.floor(
      (review.count / (processedReviewsCountSummary + apiReviewsCountSummary)) *
        100
    );
  });

  return Array.from(processedReviewsMap.values());
};

export const calculateTotalPrice = (productsArray: Product[] | UserCart[]) => {
  return productsArray
    .reduce((total: number, product) => {
      const price = product.productsInformations?.price || product.price;
      const quantity = product.quantity || 1;
      return total + price * quantity;
    }, 0)
    .toFixed(2);
};

export const generateGameKey = () => {
  return (
    Math.random().toString(36).substring(2, 6).toUpperCase() +
    "-" +
    Math.random().toString(36).substring(2, 6).toUpperCase() +
    "-" +
    Math.random().toString(36).substring(2, 6).toUpperCase()
  );
};
