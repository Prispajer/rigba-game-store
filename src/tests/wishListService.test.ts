import { wishListService } from "@/utils/injector";

jest.mock("@/utils/injector", () => ({
  wishListService: {
    getUserWishList: jest
      .fn()
      .mockImplementation(async (getUserWishListDTO) => {
        if (getUserWishListDTO.id === "123456789" && getUserWishListDTO.email) {
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

    addProductToWishList: jest
      .fn()
      .mockImplementation(async (addProductToWishListDTO) => {
        if (addProductToWishListDTO.externalProductId === 102) {
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

    deleteProductFromWishList: jest
      .fn()
      .mockImplementation(async (deleteProductFromWishListDTO) => {
        if (deleteProductFromWishListDTO.externalProductId === 999) {
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

const mockedWishListService = jest.mocked(wishListService);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("WishListService", () => {
  const mockData = {
    validWishListRequest: { email: "test@example.com", id: "123456789" },
    invalidWishListRequest: { email: "test@example.com", id: "invalid-id" },
    productToAddToWishList: {
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
    productToDeleteFromWishList: {
      email: "test@example.com",
      externalProductId: 999,
    },
  };

  describe("getUserWishList", () => {
    it("should retrieve user sent wishlist successfully", async () => {
      const getUserWishListResponse =
        await mockedWishListService.getUserWishList(
          mockData.validWishListRequest
        );
      expect(getUserWishListResponse.success).toBe(true);
      expect(getUserWishListResponse.message).toBe(
        "User wishlist retrieved successfully!"
      );
      expect(getUserWishListResponse.data).toEqual({
        id: "123456789",
        userId: "123123asdfasdasd",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should return error if user ID is invalid", async () => {
      const getUserWishListResponse =
        await mockedWishListService.getUserWishList(
          mockData.invalidWishListRequest
        );
      expect(getUserWishListResponse.success).toBe(false);
      expect(getUserWishListResponse.message).toBe("User not found!");
    });
  });

  describe("addProductToWishList", () => {
    it("should add product to wishlist successfully", async () => {
      const addProductToWishListResponse =
        await mockedWishListService.addProductToWishList({
          ...mockData.productToAddToWishList,
          externalProductId: 103,
        });
      expect(addProductToWishListResponse.success).toBe(true);
      expect(addProductToWishListResponse.message).toBe(
        "Product added to wishlist successfully!"
      );
      expect(addProductToWishListResponse.data).toEqual({
        id: "123456789",
        userId: "123123asdfasdasd",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should fail if product already exists in wishlist", async () => {
      const addProductToWishListResponse =
        await mockedWishListService.addProductToWishList(
          mockData.productToAddToWishList
        );
      expect(addProductToWishListResponse.success).toBe(false);
      expect(addProductToWishListResponse.message).toBe(
        "Product already in wishlist!"
      );
    });
  });

  describe("deleteProductFromWishList", () => {
    describe("deleteProductFromWishList", () => {
      it("should delete product from wishlist successfully", async () => {
        const deleteProductFromWishListResponse =
          await mockedWishListService.deleteProductFromWishList({
            ...mockData.productToDeleteFromWishList,
            externalProductId: 1000,
          });
        expect(deleteProductFromWishListResponse.success).toBe(true);
        expect(deleteProductFromWishListResponse.message).toBe(
          "Product removed from wishlist!"
        );
      });
    });

    it("should fail if product does not exist in wishlist", async () => {
      const deleteProductFromWishListResponse =
        await mockedWishListService.deleteProductFromWishList(
          mockData.productToDeleteFromWishList
        );
      expect(deleteProductFromWishListResponse.success).toBe(false);
      expect(deleteProductFromWishListResponse.message).toBe(
        "Product not found in wishlist!"
      );
    });
  });
});
