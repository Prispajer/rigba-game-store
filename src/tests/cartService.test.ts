import { cartService } from "@/utils/injector";
import { describe, mock } from "node:test";

jest.mock("@/utils/injector", () => ({
  cartService: {
    getUserCart: jest.fn().mockImplementation(async (getUserCartDTO) => {
      if (getUserCartDTO.email && getUserCartDTO.id) {
        return {
          success: true,
          message: "User cart retrieved successfully!",
          data: {
            id: "sdfasdfasdf123123",
            userId: "sadfsadf1312",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        };
      } else {
        return { success: false, message: "User cart not found!" };
      }
    }),

    addProductToCart: jest
      .fn()
      .mockImplementation(async (addProductToCartDTO) => {
        if (addProductToCartDTO) {
          return {
            success: true,
            message: "Product added to cart successfully!",
            data: addProductToCartDTO,
          };
        }
        return { success: false, message: "Error adding product to cart!" };
      }),

    deleteProductFromCart: jest
      .fn()
      .mockImplementation(async (deleteProductFromCartDTO) => {
        if (
          deleteProductFromCartDTO.email &&
          deleteProductFromCartDTO.externalProductId
        ) {
          return {
            success: true,
            message: "Product deleted from cart!",
            data: deleteProductFromCartDTO,
          };
        }
        return { success: false, message: "Error deleting product from cart!" };
      }),

    increaseProductQuantity: jest
      .fn()
      .mockImplementation(async (increaseProductQuantityDTO) => {
        if (
          increaseProductQuantityDTO.email &&
          increaseProductQuantityDTO.externalProductId
        ) {
          return {
            success: true,
            message: "Product quantity increased successfully!",
            data: increaseProductQuantityDTO,
          };
        }
        return {
          success: false,
          message: "Error increasing product quantity!",
          data: increaseProductQuantityDTO,
        };
      }),

    decreaseProductQuantity: jest
      .fn()
      .mockImplementation(async (decreaseProductQuantityDTO) => {
        if (
          decreaseProductQuantityDTO.email &&
          decreaseProductQuantityDTO.externalProductId
        ) {
          return {
            success: true,
            message: "Product quantity decreased successfully!",
            data: decreaseProductQuantityDTO,
          };
        }
        return {
          success: false,
          message: "Error decreasing product quantity!",
          data: decreaseProductQuantityDTO,
        };
      }),
  },
}));

const mockedCartService = jest.mocked(cartService);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("CartService", () => {
  const mockData = {
    validUserCartRequest: { id: "3", email: "test@example.com" },
    productToAddToCart: {
      email: "test@example.com",
      externalProductId: 101,
      name: "Product Name",
      description: "Product Description",
      price: 100,
      background_image: "image_url",
      rating: 5,
      quantity: 1,
      slug: "product-slug",
      released: "2024-12-13",
      added: 1,
    },
    productToDeleteFromCart: {
      email: "test@example.com",
      externalProductId: 101,
    },
    productQuantityChangeDTO: {
      email: "test@example.com",
      externalProductId: 101,
    },
  };

  describe("getUserCart", () => {
    it("should retrieve user cart successfully", async () => {
      const getUserCartResponse = await mockedCartService.getUserCart(
        mockData.validUserCartRequest
      );

      expect(getUserCartResponse.success).toBe(true);
      expect(getUserCartResponse.message).toBe(
        "User cart retrieved successfully!"
      );
      expect(getUserCartResponse.data).toEqual({
        id: "sdfasdfasdf123123",
        userId: "sadfsadf1312",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should fail when no email is provided", async () => {
      const response = await mockedCartService.getUserCart({
        id: "3",
        email: "",
      });
      expect(response.success).toBe(false);
      expect(response.message).toBe("User cart not found!");
    });
  });

  describe("addProductToCart", () => {
    it("should add product to cart successfully", async () => {
      const addProductToCartResponse = await mockedCartService.addProductToCart(
        mockData.productToAddToCart
      );

      expect(addProductToCartResponse.success).toBe(true);
      expect(addProductToCartResponse.message).toBe(
        "Product added to cart successfully!"
      );
      expect(addProductToCartResponse.data).toEqual(
        mockData.productToAddToCart
      );
    });
  });

  describe("deleteProductFromCart", () => {
    it("should delete product from cart successfully", async () => {
      const deleteProductFromCartResponse =
        await mockedCartService.deleteProductFromCart(
          mockData.productToDeleteFromCart
        );

      expect(deleteProductFromCartResponse.success).toBe(true);
      expect(deleteProductFromCartResponse.message).toBe(
        "Product deleted from cart!"
      );
      expect(deleteProductFromCartResponse.data).toBe(
        deleteProductFromCartResponse.data
      );
    });
  });

  describe("increaseProductQuantity", () => {
    it("should increase product quantity successfully", async () => {
      const increaseProductQuantityResponse =
        await mockedCartService.increaseProductQuantity(
          mockData.productQuantityChangeDTO
        );

      expect(increaseProductQuantityResponse.success).toBe(true);
      expect(increaseProductQuantityResponse.message).toBe(
        "Product quantity increased successfully!"
      );
      expect(increaseProductQuantityResponse.data).toBe(
        increaseProductQuantityResponse.data
      );
    });
  });

  describe("decreaseProductQuantity", () => {
    it("should decrease product quantity successfully", async () => {
      const decreaseProductQuantityResponse =
        await mockedCartService.decreaseProductQuantity(
          mockData.productQuantityChangeDTO
        );

      expect(decreaseProductQuantityResponse.success).toBe(true);
      expect(decreaseProductQuantityResponse.message).toBe(
        "Product quantity decreased successfully!"
      );
      expect(decreaseProductQuantityResponse.data).toBe(
        decreaseProductQuantityResponse.data
      );
    });
  });
});
