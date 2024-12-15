import { reviewService } from "@/utils/injector";

jest.mock("@/utils/injector", () => ({
  reviewService: {
    getProductReviews: jest
      .fn()
      .mockImplementation(async (getProductReviewsDTO) => {
        if (getProductReviewsDTO.externalProductId === "123") {
          return {
            success: true,
            message: "Reviews retrieved successfully!",
            data: [{ review: "Great product!" }],
          };
        }
        return {
          success: false,
          message: "Product not found!",
          data: null,
        };
      }),

    addReviewToProduct: jest
      .fn()
      .mockImplementation(async (addReviewToProductDTO) => {
        if (addReviewToProductDTO.externalProductId === "123") {
          return {
            success: true,
            message: "Review was added successfully to product!",
            data: { id: "review-1" },
          };
        }
        return { success: false, message: "Invalid product data!", data: null };
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
    getProductReviewsDTO: { externalProductId: "123" },
    addReviewToProductDTO: {
      email: "test@example.com",
      externalProductId: "123",
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
      externalProductId: "123",
      userId: "user-123",
    },
    unLikeReviewDTO: {
      reviewId: "review-1",
      externalProductId: "123",
      userId: "user-123",
    },
  };

  describe("getProductReviews", () => {
    it("should retrieve reviews for valid product", async () => {
      const response = await mockedReviewService.getProductReviews(
        mockData.getProductReviewsDTO
      );
      expect(response.success).toBe(true);
      expect(response.message).toBe("Reviews retrieved successfully!");
      expect(response.data).toEqual([{ review: "Great product!" }]);
    });

    it("should return error if product not found", async () => {
      const response = await mockedReviewService.getProductReviews({
        externalProductId: "999",
      });
      expect(response.success).toBe(false);
      expect(response.message).toBe("Product not found!");
    });
  });

  describe("addReviewToProduct", () => {
    it("should add a review to product successfully", async () => {
      const response = await mockedReviewService.addReviewToProduct(
        mockData.addReviewToProductDTO
      );
      expect(response.success).toBe(true);
      expect(response.message).toBe(
        "Review was added successfully to product!"
      );
    });

    it("should fail if product data is invalid", async () => {
      const response = await mockedReviewService.addReviewToProduct({
        externalProductId: "999",
        review: "Bad product!",
        userId: "user-999",
      });
      expect(response.success).toBe(false);
      expect(response.message).toBe("Invalid product data!");
    });
  });

  describe("likeReview", () => {
    it("should successfully like a review", async () => {
      const response = await mockedReviewService.likeReview(
        mockData.likeReviewDTO
      );
      expect(response.success).toBe(true);
      expect(response.message).toBe("Review liked successfully!");
    });

    it("should fail if review not found", async () => {
      const response = await mockedReviewService.likeReview({
        reviewId: "999",
        externalProductId: "123",
        userId: "user-123",
      });
      expect(response.success).toBe(false);
      expect(response.message).toBe("Review not found!");
    });
  });

  describe("unLikeReview", () => {
    it("should successfully unlike a review", async () => {
      const response = await mockedReviewService.unLikeReview(
        mockData.unLikeReviewDTO
      );
      expect(response.success).toBe(true);
      expect(response.message).toBe("Review unliked successfully!");
    });

    it("should fail if review not found", async () => {
      const response = await mockedReviewService.unLikeReview({
        reviewId: "999",
        externalProductId: "123",
        userId: "user-123",
      });
      expect(response.success).toBe(false);
      expect(response.message).toBe("Review not found!");
    });
  });
});
