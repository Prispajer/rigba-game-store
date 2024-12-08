export const generateStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const decimalPart = rating % 1;

  const fullStar = Array(fullStars)
    .fill(0)
    .map((_, index) => (
      <div key={`full-${index}`} className="rating-star filled"></div>
    ));

  const partialStar =
    decimalPart > 0 ? (
      <span
        key={`partial-${decimalPart * 100}`}
        className="rating-star"
        style={{
          background: `linear-gradient(to right, gold ${
            decimalPart * 100
          }%, transparent ${decimalPart * 100}%)`,
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      ></span>
    ) : null;

  const emptyStar = Array(5 - fullStars - (decimalPart > 0 ? 1 : 0))
    .fill(0)
    .map((_, index) => (
      <div key={`empty-${index}`} className="rating-star empty"></div>
    ));

  return (
    <div className="flex items-center">
      {fullStar}
      {partialStar}
      {emptyStar}
    </div>
  );
};

export const calculateAverageRating = (
  mergedReviews: {
    count: number;
    id: number;
    title: string;
    percent: number;
  }[]
): number => {
  const ratingValues: { [key: number]: number } = {
    5: 5,
    4: 4,
    3: 3,
    2: 2,
    1: 1,
  };

  const totalWeightedRating = mergedReviews.reduce(
    (acc, mergedReview) =>
      acc + ratingValues[mergedReview.id] * mergedReview.count,
    0
  );

  const totalReviewsCount = mergedReviews.reduce(
    (acc, mergedReview) => acc + mergedReview.count,
    0
  );

  const averageRating =
    totalReviewsCount > 0 ? totalWeightedRating / totalReviewsCount : 0;

  return Number(averageRating.toFixed(2));
};
