import { UserReviews } from "./helpers/types";

export const groupReviewsByRating = (
  reviews: UserReviews[]
): Array<{ count: number; id: number; percent: number; title: string }> => {
  const reviewsGroupedByRating: Record<
    string,
    { count: number; id: number; percent: number; title: string }
  > = {};

  reviews.forEach((review) => {
    if (review.rating.rating && review.rating.percent !== undefined) {
      if (reviewsGroupedByRating[review.rating.rating]) {
        reviewsGroupedByRating[review.rating.rating].count += 1;
      } else {
        reviewsGroupedByRating[review.rating.rating] = {
          count: 1,
          id: review.rating.rating,
          title: review.rating.title,
          percent: review.rating.percent,
        };
      }
    }
  });

  Object.keys(reviewsGroupedByRating).forEach((key) => {
    reviewsGroupedByRating[key].percent = Math.floor(
      (reviewsGroupedByRating[key].count / reviews.length) * 100
    );
  });

  return Object.values(reviewsGroupedByRating);
};

export const mergeReviews = (
  reviewsGroupedByRating: Array<{
    count: number;
    id: number;
    title: string;
    percent: number;
  }>,
  reviewsGroupedByApi: Array<{
    id: number;
    title: string;
    count: number;
    percent: number;
  }>
): Array<{ count: number; id: number; title: string; percent: number }> => {
  const reviewsGroupedByRatingMap = new Map<
    number,
    { count: number; id: number; title: string; percent: number }
  >();

  reviewsGroupedByRating.forEach((reviewGroupedByRating) => {
    reviewsGroupedByRatingMap.set(reviewGroupedByRating.id, {
      ...reviewGroupedByRating,
    });
  });

  const reviewsGroupedByRatingTotalCount = reviewsGroupedByRating.reduce(
    (acc, reviewGroupedByRating) => acc + reviewGroupedByRating.count,
    0
  );

  const reviewsGroupedByApiTotalCount = reviewsGroupedByApi.reduce(
    (acc, reviewGroupedByApi) => acc + reviewGroupedByApi.count,
    0
  );

  reviewsGroupedByApi.forEach((reviewGroupedByApi) => {
    const reviewGroupedByRating = reviewsGroupedByRatingMap.get(
      reviewGroupedByApi.id
    );

    if (reviewGroupedByRating) {
      reviewGroupedByRating.count += reviewGroupedByApi.count;
    } else {
      reviewsGroupedByRatingMap.set(reviewGroupedByApi.id, {
        count: reviewGroupedByApi.count,
        id: reviewGroupedByApi.id,
        title:
          reviewGroupedByApi.title.charAt(0).toUpperCase() +
          reviewGroupedByApi.title.slice(1),
        percent: reviewGroupedByApi.percent,
      });
    }
  });

  reviewsGroupedByRatingMap.forEach((review) => {
    review.percent = Math.floor(
      (review.count /
        (reviewsGroupedByRatingTotalCount + reviewsGroupedByApiTotalCount)) *
        100
    );
  });

  return Array.from(reviewsGroupedByRatingMap.values());
};
