import { NextRequest, NextResponse } from "next/server";
import { purchaseHistoryService } from "@/utils/injector";
import { RequestResponse } from "@/types/types";
import { ProductHistory } from "@prisma/client";

export async function POST(request: NextRequest) {
  const getUserProductHistoryClient = await request.json();

  const getUserProductHistory =
    await purchaseHistoryService.getUserProductHistory(
      getUserProductHistoryClient
    );

  return NextResponse.json<RequestResponse<ProductHistory[] | null>>({
    success: getUserProductHistory.success,
    message: getUserProductHistory.message,
    data: (getUserProductHistory.data as ProductHistory[]) || null,
  });
}
