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
      <div
        className="rating-star"
        style={{
          background: `linear-gradient(to right, gold ${
            decimalPart * 100
          }%, transparent ${decimalPart * 100}%)`,
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      ></div>
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

export const calculateOverallRating = (
  data: {
    count: number;
    id: number;
    title: string;
    percent: number;
  }[]
): number => {
  const starRatings: { [key: number]: number } = {
    5: 5,
    4: 4,
    3: 3,
    2: 2,
    1: 1,
  };

  const totalWeightedRating = data.reduce(
    (acc, review) => acc + starRatings[review.id] * review.count,
    0
  );

  const totalRatingsCount = data.reduce((acc, review) => acc + review.count, 0);

  const averageRating =
    totalRatingsCount > 0 ? totalWeightedRating / totalRatingsCount : 0;

  return Number(averageRating.toFixed(2));
};
