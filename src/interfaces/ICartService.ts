export default interface ICartService {
  getUserCart(
    getUserCartDTO: GetUserCartDTO
  ): Promise<RequestResponse<User | Cart | null>>;
  addProductToCart(
    addProductToCartDTO: AddProductToCartDTO
  ): Promise<RequestResponse<User | Cart | null>>;
  deleteProductFromCart(
    deleteProductFromCartDTO: DeleteProductFromCartDTO
  ): Promise<RequestResponse<User | Product | Cart | null>>;
  increaseProductQuantity(
    increaseProductQuantityDTO: IncreaseProductQuantityDTO
  ): Promise<RequestResponse<User | Product | Cart | null>>;
  decreaseProductQuantity(
    decreaseProductQuantityDTO: DecreaseProductQuantityDTO
  ): Promise<RequestResponse<User | Product | Cart | null>>;
}
