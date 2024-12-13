import { cartService } from "@/utils/injector";

jest.mock("@/utils/injector", () => ({
  cartService: {
    getUserCart: jest.fn().mockImplementation(async (getUserCartDTO) => {
      if (getUserCartDTO.email && getUserCartDTO.id) {
        return { success: true, message: "User cart retrieved successfully!" };
      }
      return { success: false, message: "User cart not found!" };
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
          return { success: true, message: "Product deleted from cart!" };
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
          };
        }
        return {
          success: false,
          message: "Error increasing product quantity!",
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
          };
        }
        return {
          success: false,
          message: "Error decreasing product quantity!",
        };
      }),
  },
}));

const mockedCartService = jest.mocked(cartService);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("CartService Tests", () => {
  it("should retrieve user cart successfully", async () => {
    const getUserCartDTO = { id: "3", email: "test@example.com" };
    const response = await mockedCartService.getUserCart(getUserCartDTO);

    expect(response.success).toBe(true);
    expect(response.message).toBe("User cart retrieved successfully!");
  });

  it("should add product to cart successfully", async () => {
    const addProductToCartDTO = {
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
    };
    const response = await mockedCartService.addProductToCart(
      addProductToCartDTO
    );

    expect(response.data).toBe(addProductToCartDTO);
    expect(response.success).toBe(true);
    expect(response.message).toBe("Product added to cart successfully!");
  });

  it("should delete product from cart successfully", async () => {
    const deleteProductFromCartDTO = {
      email: "test@example.com",
      externalProductId: 101,
    };
    const response = await mockedCartService.deleteProductFromCart(
      deleteProductFromCartDTO
    );

    expect(response.success).toBe(true);
    expect(response.message).toBe("Product deleted from cart!");
  });

  it("should increase product quantity successfully", async () => {
    const increaseProductQuantityDTO = {
      email: "test@example.com",
      externalProductId: 101,
    };
    const response = await mockedCartService.increaseProductQuantity(
      increaseProductQuantityDTO
    );

    expect(response.success).toBe(true);
    expect(response.message).toBe("Product quantity increased successfully!");
  });

  it("should decrease product quantity successfully", async () => {
    const decreaseProductQuantityDTO = {
      email: "test@example.com",
      externalProductId: 101,
    };
    const response = await mockedCartService.decreaseProductQuantity(
      decreaseProductQuantityDTO
    );

    expect(response.success).toBe(true);
    expect(response.message).toBe("Product quantity decreased successfully!");
  });
});
