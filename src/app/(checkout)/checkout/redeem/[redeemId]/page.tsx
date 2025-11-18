import { Metadata } from "next";
import RedeemContainer from "@/components/Interface/Checkout/Redeem/RedeemContainer";
import CheckoutStepSetter from "@/components/Interface/Checkout/CheckoutStepSetter";
import { CheckoutStep } from "@/redux/slices/ui/ui.types";

export const generateMetadata = async (
    data: { params: Promise<{ redeemId: string }> }
): Promise<Metadata> => {
    const params = await data.params;
    const title = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${params.redeemId}`);
        }, 100);
    });

    return {
        title: `Order ${title}`,
    };
};

export default async function RedeemPage(
    data: { params: Promise<{ redeemId: string }> }
) {
    const params = await data.params;

    return (
        <>
            <CheckoutStepSetter step={CheckoutStep.Redeem} />
            <RedeemContainer params={params} />
        </>
    );
}