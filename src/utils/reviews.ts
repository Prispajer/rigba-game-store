import { UserReviews } from "./helpers/types";

export const processReviews = (
  reviews: UserReviews[]
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
    groupedReviews[key].percent = Math.floor(
      (groupedReviews[key].count / reviews.length) * 100
    );
  });

  return Object.values(groupedReviews);
};

export const mergeReviews = (
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
