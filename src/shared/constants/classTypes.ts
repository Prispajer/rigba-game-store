const CLASSTYPES = {
    IUserService: Symbol.for("IUserService"),
    IUserRepository: Symbol.for("IUserRepository"),
    ITokenService: Symbol.for("ITokenService"),
    ITokenRepository: Symbol.for("ITokenRepository"),
    ICartService: Symbol.for("ICartService"),
    ICartRepository: Symbol.for("ICartRepository"),
    IWishlistService: Symbol.for("IWishlistService"),
    IWishlistRepository: Symbol.for("IWishlistRepository"),
    IReviewService: Symbol.for("IReviewService"),
    IReviewRepository: Symbol.for("IReviewRepository"),
    IProductService: Symbol.for("IProductService"),
    IProductRepository: Symbol.for("IProductRepository"),
    ICheckerService: Symbol.for("ICheckerService"),
    IPurchaseHistoryService: Symbol.for("IPurchaseHistoryService"),
    IPurchaseHistoryRepository: Symbol.for("IPurchaseHistoryRepository"),
};
export default CLASSTYPES;