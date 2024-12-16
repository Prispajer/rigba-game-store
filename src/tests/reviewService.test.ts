import { reviewService } from "@/utils/injector";

jest.mock("@/utils/injector", () => ({
  reviewService: {
    getProductReviews: jest
      .fn()
      .mockImplementation(async (getProductReviewsDTO) => {
        if (getProductReviewsDTO.externalProductId === 123) {
          return {
            success: true,
            message: "Reviews retrieved successfully!",
            data: [{ review: "Great product!" }],
          };
        } else if (getProductReviewsDTO.externalProductId === 999) {
          return {
            success: false,
            message: "Product not found!",
            data: null,
          };
        }
        return {
          success: false,
          message: "Reviews not found!",
          data: [],
        };
      }),

    addReviewToProduct: jest
      .fn()
      .mockImplementation(async (addReviewToProductDTO) => {
        if (addReviewToProductDTO.description === "") {
          return {
            success: false,
            message: "Review description is required!",
            data: null,
          };
        }

        if (addReviewToProductDTO.externalProductId === 999) {
          return {
            success: false,
            message: "Review wasn't added!",
            data: { id: "review-1" },
          };
        }
        return {
          success: true,
          message: "Review was added successfully to product!",
          data: { id: "review-1" },
        };
      }),

    likeReview: jest.fn().mockImplementation(async (likeReviewDTO) => {
      if (likeReviewDTO.reviewId === "review-1") {
        return {
          success: true,
          message: "Review liked successfully!",
        };
      }
      return { success: false, message: "Review not found!" };
    }),

    unLikeReview: jest.fn().mockImplementation(async (unLikeReviewDTO) => {
      if (unLikeReviewDTO.reviewId === "review-1") {
        return {
          success: true,
          message: "Review unliked successfully!",
        };
      }
      return { success: false, message: "Review not found!" };
    }),
  },
}));

const mockedReviewService = jest.mocked(reviewService);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ReviewService", () => {
  const mockData = {
    getProductReviewsDTO: { userId: "132123", externalProductId: 123 },
    addReviewToProductDTO: {
      email: "test@example.com",
      externalProductId: 123,
      reviewId: "review-1",
      userId: "user-123",
      name: "Product A",
      price: 19.99,
      background_image: "image-url.jpg",
      rating: 5,
      description: "This is a great product.",
      slug: "product-a",
      percent: 100,
      released: "2024-12-15",
      added: 0,
      title: "Great Product",
      likes: 0,
    },
    likeReviewDTO: {
      reviewId: "review-1",
      externalProductId: 123,
      email: "user-123",
    },
    unLikeReviewDTO: {
      reviewId: "review-1",
      externalProductId: 123,
      email: "user-123",
    },
  };

  describe("getProductReviews", () => {
    it("should retrieve reviews for valid product", async () => {
      const getProductReviewsResponse =
        await mockedReviewService.getProductReviews(
          mockData.getProductReviewsDTO
        );
      expect(getProductReviewsResponse.success).toBe(true);
      expect(getProductReviewsResponse.message).toBe(
        "Reviews retrieved successfully!"
      );
      expect(getProductReviewsResponse.data).toEqual([
        { review: "Great product!" },
      ]);
    });

    it("should return error if product not found", async () => {
      const getProductReviewsResponse =
        await mockedReviewService.getProductReviews({
          ...mockData.getProductReviewsDTO,
          externalProductId: 999,
        });
      expect(getProductReviewsResponse.success).toBe(false);
      expect(getProductReviewsResponse.message).toBe("Product not found!");
    });

    it("should return empty data when product has no reviews", async () => {
      const getProductReviewsResponse =
        await mockedReviewService.getProductReviews({
          externalProductId: 456,
          userId: "132123",
        });
      expect(getProductReviewsResponse.success).toBe(false);
      expect(getProductReviewsResponse.message).toBe("Reviews not found!");
      expect(getProductReviewsResponse.data).toEqual([]);
    });
  });

  describe("addReviewToProduct", () => {
    it("should add a review to product successfully", async () => {
      const addReviewToProductResponse =
        await mockedReviewService.addReviewToProduct(
          mockData.addReviewToProductDTO
        );
      expect(addReviewToProductResponse.success).toBe(true);
      expect(addReviewToProductResponse.message).toBe(
        "Review was added successfully to product!"
      );
      expect(addReviewToProductResponse.data?.id).toBe("review-1");
    });

    it("should fail if product data is invalid", async () => {
      const addReviewToProductResponse =
        await mockedReviewService.addReviewToProduct({
          ...mockData.addReviewToProductDTO,
          externalProductId: 999,
        });
      expect(addReviewToProductResponse.success).toBe(false);
      expect(addReviewToProductResponse.message).toBe("Review wasn't added!");
    });

    it("should fail if description is empty", async () => {
      const addReviewToProductResponse =
        await mockedReviewService.addReviewToProduct({
          ...mockData.addReviewToProductDTO,
          description: "",
        });
      expect(addReviewToProductResponse.success).toBe(false);
      expect(addReviewToProductResponse.message).toBe(
        "Review description is required!"
      );
    });
  });

  describe("likeReview", () => {
    it("should successfully like a review", async () => {
      const likeReviewResponse = await mockedReviewService.likeReview(
        mockData.likeReviewDTO
      );
      expect(likeReviewResponse.success).toBe(true);
      expect(likeReviewResponse.message).toBe("Review liked successfully!");
    });

    it("should fail if review not found", async () => {
      const likeReviewResponse = await mockedReviewService.likeReview({
        reviewId: "999",
        externalProductId: 123,
        email: "user-123",
      });
      expect(likeReviewResponse.success).toBe(false);
      expect(likeReviewResponse.message).toBe("Review not found!");
    });
  });

  describe("unLikeReview", () => {
    it("should successfully unlike a review", async () => {
      const unLikeReviewResponse = await mockedReviewService.unLikeReview(
        mockData.unLikeReviewDTO
      );
      expect(unLikeReviewResponse.success).toBe(true);
      expect(unLikeReviewResponse.message).toBe("Review unliked successfully!");
    });

    it("should fail if review not found", async () => {
      const unLikeReviewResponse = await mockedReviewService.unLikeReview({
        reviewId: "999",
        externalProductId: 123,
        email: "user-123",
      });
      expect(unLikeReviewResponse.success).toBe(false);
      expect(unLikeReviewResponse.message).toBe("Review not found!");
    });
  });
});
