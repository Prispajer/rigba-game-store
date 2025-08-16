import { NextRequest, NextResponse } from "next/server";
import { tokenService } from "@/utils/injector";
import { RequestResponse } from "@/types/types";
import { TwoFactorToken } from "@prisma/client";

export async function POST(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse<RequestResponse<TwoFactorToken>>> {
  const toggleTwoFactorTokenClientData = await request.json();

  const resetPasswordResponse = await tokenService.sendToggleTwoFactorToken(
    toggleTwoFactorTokenClientData
  );

  if (!resetPasswordResponse) {
    return NextResponse.json<RequestResponse<TwoFactorToken>>({
      success: false,
      message: "Something went wrong, no response from service.",
      data: null,
    });
  }

  return NextResponse.json<RequestResponse<TwoFactorToken>>({
    success: resetPasswordResponse.success,
    message: resetPasswordResponse.message,
    data: resetPasswordResponse.data as TwoFactorToken | null,
  });
}
