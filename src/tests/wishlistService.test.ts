import { wishlistService } from "@/utils/injector";

jest.mock("@/utils/injector", () => ({
  wishListService: {
    getUserWishlist: jest
      .fn()
      .mockImplementation(async (getUserWishlistDTO) => {
        if (getUserWishlistDTO.id === "123456789" && getUserWishlistDTO.email) {
          return {
            success: true,
            message: "User wishlist retrieved successfully!",
            data: {
              id: "123456789",
              userId: "123123asdfasdasd",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          };
        }
        return { success: false, message: "User not found!", data: null };
      }),

    addProductToWishlist: jest
      .fn()
      .mockImplementation(async (addProductToWishlistDTO) => {
        if (addProductToWishlistDTO.externalProductId === 102) {
          return {
            success: false,
            message: "Product already in wishlist!",
            data: null,
          };
        }
        return {
          success: true,
          message: "Product added to wishlist successfully!",
          data: {
            id: "123456789",
            userId: "123123asdfasdasd",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        };
      }),

    deleteProductFromWishlist: jest
      .fn()
      .mockImplementation(async (deleteProductFromWishlistDTO) => {
        if (deleteProductFromWishlistDTO.externalProductId === 999) {
          return {
            success: false,
            message: "Product not found in wishlist!",
            data: null,
          };
        }
        return {
          success: true,
          message: "Product removed from wishlist!",
          data: null,
        };
      }),
  },
}));

const mockedWishlistService = jest.mocked(wishlistService);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("WishlistService", () => {
  const mockData = {
    validWishlistRequest: { email: "test@example.com", id: "123456789" },
    invalidWishlistRequest: { email: "test@example.com", id: "invalid-id" },
    productToAddToWishlist: {
      id: "product-id",
      email: "test@example.com",
      externalProductId: 102,
      name: "Product Name",
      description: "Product Description",
      price: 199.99,
      background_image: "image-url.jpg",
      rating: 4.5,
      slug: "product-slug",
      released: "2024-12-15",
      added: 0,
    },
    productToDeleteFromWishlist: {
      email: "test@example.com",
      externalProductId: 999,
    },
  };

  describe("getUserWishlist", () => {
    it("should retrieve user sent wishlist successfully", async () => {
      const getUserWishlistResponse =
        await mockedWishlistService.getUserWishlist(
          mockData.validWishlistRequest
        );
      expect(getUserWishlistResponse.success).toBe(true);
      expect(getUserWishlistResponse.message).toBe(
        "User wishlist retrieved successfully!"
      );
      expect(getUserWishlistResponse.data).toEqual({
        id: "123456789",
        userId: "123123asdfasdasd",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should return error if user ID is invalid", async () => {
      const getUserWishlistResponse =
        await mockedWishlistService.getUserWishlist(
          mockData.invalidWishlistRequest
        );
      expect(getUserWishlistResponse.success).toBe(false);
      expect(getUserWishlistResponse.message).toBe("User not found!");
    });
  });

  describe("addProductToWishlist", () => {
    it("should add product to wishlist successfully", async () => {
      const addProductToWishlistResponse =
        await mockedWishlistService.addProductToWishlist({
          ...mockData.productToAddToWishlist,
          externalProductId: 103,
        });
      expect(addProductToWishlistResponse.success).toBe(true);
      expect(addProductToWishlistResponse.message).toBe(
        "Product added to wishlist successfully!"
      );
      expect(addProductToWishlistResponse.data).toEqual({
        id: "123456789",
        userId: "123123asdfasdasd",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should fail if product already exists in wishlist", async () => {
      const addProductToWishlistResponse =
        await mockedWishlistService.addProductToWishlist(
          mockData.productToAddToWishlist
        );
      expect(addProductToWishlistResponse.success).toBe(false);
      expect(addProductToWishlistResponse.message).toBe(
        "Product already in wishlist!"
      );
    });
  });

  describe("deleteProductFromWishlist", () => {
    describe("deleteProductFromWishlist", () => {
      it("should delete product from wishlist successfully", async () => {
        const deleteProductFromWishlistResponse =
          await mockedWishlistService.deleteProductFromWishlist({
            ...mockData.productToDeleteFromWishlist,
            externalProductId: 1000,
          });
        expect(deleteProductFromWishlistResponse.success).toBe(true);
        expect(deleteProductFromWishlistResponse.message).toBe(
          "Product removed from wishlist!"
        );
      });
    });

    it("should fail if product does not exist in wishlist", async () => {
      const deleteProductFromWishlistResponse =
        await mockedWishlistService.deleteProductFromWishlist(
          mockData.productToDeleteFromWishlist
        );
      expect(deleteProductFromWishlistResponse.success).toBe(false);
      expect(deleteProductFromWishlistResponse.message).toBe(
        "Product not found in wishlist!"
      );
    });
  });
});
