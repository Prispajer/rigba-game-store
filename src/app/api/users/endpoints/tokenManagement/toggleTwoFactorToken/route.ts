import { NextRequest, NextResponse } from "next/server";
import { tokenService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { PasswordResetToken } from "@prisma/client";

export async function POST(request: NextRequest, response: NextResponse) {
  const toggleTwoFactorTokenClientData = await request.json();

  const resetPasswordResponse = await tokenService.sendToggleTwoFactorToken(
    toggleTwoFactorTokenClientData
  );

  return NextResponse.json<RequestResponse<PasswordResetToken>>({
    success: resetPasswordResponse.success,
    message: resetPasswordResponse.message,
    data: resetPasswordResponse.data,
  });
}
