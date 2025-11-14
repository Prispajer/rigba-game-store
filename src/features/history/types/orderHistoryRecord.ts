import {Key} from "@prisma/client";

type OrderHistoryRecord = {
    status: string;
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    cartHistoryId: string;
    paymentMethod: string;
    paymentIntentId: string;
    total: number;
    keys: Key[];
}

export default OrderHistoryRecord;