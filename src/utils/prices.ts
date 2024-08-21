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

export const processReviews = (
  reviews: UserReview[]
): Record<
  string,
  { count: number; id: number; percent: number; title: string }
> => {
  let groupedReviews: Record<
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

  return groupedReviews;
};

export const mergeReviewData = (
  reviewData: Record<
    string,
    { count: number; id: number; title: string; percent: number }
  >,
  percentData: Record<
    string,
    { id: number; title: string; count: number; percent: number }
  >
): Record<
  string,
  { count: number; id: number; title: string; percent: number }
> => {
  const myReviews = { ...reviewData };

  Object.keys(percentData).forEach((key) => {
    const percentItem = percentData[key];
    const reviewItem = myReviews[key];

    if (reviewItem) {
      reviewItem.count = percentItem.count + reviewItem.count;
      reviewItem.percent = Math.floor(reviewItem.count);
    } else {
      myReviews[key] = {
        count: percentItem.count,
        id: percentItem.id,
        title:
          percentItem.title.charAt(0).toUpperCase() +
          percentItem.title.slice(1),
        percent: percentItem.percent,
      };
    }
  });

  return myReviews;
};
