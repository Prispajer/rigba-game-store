import { NextRequest, NextResponse } from "next/server";
import { purchaseHistoryService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { OrderHistory } from "@prisma/client";

export async function POST(request: NextRequest) {
  const getUserOrderHistoryClient = await request.json();

  const getUserOrderHistory = await purchaseHistoryService.getUserOrderHistory(
    getUserOrderHistoryClient
  );

  return NextResponse.json<RequestResponse<OrderHistory[] | null>>({
    success: getUserOrderHistory.success,
    message: getUserOrderHistory.message,
    data: (getUserOrderHistory.data as OrderHistory[]) || null,
  });
}
