export enum CheckoutStep {
    Checkout = "checkout",
    Payment = "payment",
    Redeem = "redeem",
}

export type UiState =
    Record<string, boolean | CheckoutStep>