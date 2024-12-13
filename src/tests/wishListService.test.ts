import { RequestResponse } from "@/utils/helpers/types";
import { User, WishList, Product } from "@prisma/client";

jest.mock("@/utils/injector", () => ({
  ICheckerService: {
    checkDataExistsAndReturnUser: jest.fn(),
    checkDataExistsAndReturnUserWishList: jest.fn(),
    checkDataExistsAndReturnProduct: jest.fn(),
    handleError: jest.fn(),
    handleSuccess: jest.fn(),
  },
  IWishListRepository: {
    createUserProductWishList: jest.fn(),
    deleteUserProductFromWishList: jest.fn(),
  },
  IProductRepository: {
    deleteUserProduct: jest.fn(),
  },
}));

describe("WishListService Tests", () => {
  let wishListService: WishListService;
  let checkerService: ICheckerService;
  let wishListRepository: IWishListRepository;
  let productRepository: IProductRepository;

  beforeEach(() => {
    checkerService = new ICheckerService();
    wishListRepository = new IWishListRepository();
    productRepository = new IProductRepository();
    wishListService = new WishListService(
      checkerService,
      wishListRepository,
      productRepository
    );

    jest.clearAllMocks();
  });

  it("should retrieve user wishlist successfully", async () => {
    const getUserWishListDTO = { email: "test@example.com", id: "user-id" };
    const mockWishListResponse: RequestResponse<WishList | null> = {
      success: true,
      message: "User wishlist retrieved successfully!",
      data: { id: "wish-list-id", userId: "user-id", products: [] },
    };

    checkerService.checkDataExistsAndReturnUserWishList.mockResolvedValue(
      mockWishListResponse
    );

    const response = await wishListService.getUserWishList(getUserWishListDTO);

    expect(response.success).toBe(true);
    expect(response.message).toBe("User wishlist retrieved successfully!");
    expect(response.data).toEqual(mockWishListResponse.data);
  });

  it("should add product to wishlist successfully", async () => {
    const addProductToWishListDTO = {
      email: "test@example.com",
      externalProductId: 101,
      name: "Product Name",
      description: "Product Description",
      price: 100,
      background_image: "image_url",
      rating: 5,
      slug: "product-slug",
      released: "2024-12-13",
      added: 1,
    };

    const mockUserResponse: RequestResponse<User> = {
      success: true,
      message: "User found",
      data: { id: "user-id", email: "test@example.com" },
    };

    const mockWishListResponse: RequestResponse<WishList> = {
      success: true,
      message: "Wish list retrieved",
      data: { id: "wish-list-id", userId: "user-id", products: [] },
    };

    const mockProductResponse: RequestResponse<Product> = {
      success: false,
      message: "Product not found",
      data: null,
    };

    checkerService.checkDataExistsAndReturnUser.mockResolvedValue(
      mockUserResponse
    );
    checkerService.checkDataExistsAndReturnUserWishList.mockResolvedValue(
      mockWishListResponse
    );
    checkerService.checkDataExistsAndReturnProduct.mockResolvedValue(
      mockProductResponse
    );
    wishListRepository.createUserProductWishList.mockResolvedValue(
      mockWishListResponse.data
    );

    const response = await wishListService.addProductToWishList(
      addProductToWishListDTO
    );

    expect(response.success).toBe(true);
    expect(response.message).toBe("Product added to wishlist successfully!");
  });

  it("should fail to add product to wishlist if product already exists", async () => {
    const addProductToWishListDTO = {
      email: "test@example.com",
      externalProductId: 101,
      name: "Product Name",
      description: "Product Description",
      price: 100,
      background_image: "image_url",
      rating: 5,
      slug: "product-slug",
      released: "2024-12-13",
      added: 1,
    };

    const mockUserResponse: RequestResponse<User> = {
      success: true,
      message: "User found",
      data: { id: "user-id", email: "test@example.com" },
    };

    const mockWishListResponse: RequestResponse<WishList> = {
      success: true,
      message: "Wish list retrieved",
      data: { id: "wish-list-id", userId: "user-id", products: [] },
    };

    const mockProductResponse: RequestResponse<Product> = {
      success: true,
      message: "Product found",
      data: {
        id: "product-id",
        externalProductId: 101,
        wishListId: "wish-list-id",
      },
    };

    checkerService.checkDataExistsAndReturnUser.mockResolvedValue(
      mockUserResponse
    );
    checkerService.checkDataExistsAndReturnUserWishList.mockResolvedValue(
      mockWishListResponse
    );
    checkerService.checkDataExistsAndReturnProduct.mockResolvedValue(
      mockProductResponse
    );

    const response = await wishListService.addProductToWishList(
      addProductToWishListDTO
    );

    expect(response.success).toBe(false);
    expect(response.message).toBe("User wishlist product already exists!");
  });

  it("should delete product from wishlist successfully", async () => {
    const deleteProductFromWishListDTO = {
      email: "test@example.com",
      externalProductId: 101,
    };

    const mockUserResponse: RequestResponse<User> = {
      success: true,
      message: "User found",
      data: { id: "user-id", email: "test@example.com" },
    };

    const mockWishListResponse: RequestResponse<WishList> = {
      success: true,
      message: "Wish list retrieved",
      data: { id: "wish-list-id", userId: "user-id", products: [] },
    };

    const mockProductResponse: RequestResponse<Product> = {
      success: true,
      message: "Product found",
      data: {
        id: "product-id",
        externalProductId: 101,
        wishListId: "wish-list-id",
      },
    };

    checkerService.checkDataExistsAndReturnUser.mockResolvedValue(
      mockUserResponse
    );
    checkerService.checkDataExistsAndReturnUserWishList.mockResolvedValue(
      mockWishListResponse
    );
    checkerService.checkDataExistsAndReturnProduct.mockResolvedValue(
      mockProductResponse
    );
    wishListRepository.deleteUserProductFromWishList.mockResolvedValue(
      mockWishListResponse.data
    );

    const response = await wishListService.deleteProductFromWishList(
      deleteProductFromWishListDTO
    );

    expect(response.success).toBe(true);
    expect(response.message).toBe(
      "Product deleted from wishlist successfully!"
    );
  });
});
