import { NextRequest, NextResponse } from "next/server";
import { tokenService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { PasswordResetToken } from "@prisma/client";

export async function POST(request: NextRequest, response: NextResponse) {
  const resetPasswordTokenClientData = await request.json();
  const resetPasswordTokenResponse = await tokenService.sendResetPasswordToken(
    resetPasswordTokenClientData
  );
  return NextResponse.json<RequestResponse<PasswordResetToken>>({
    success: resetPasswordTokenResponse.success,
    message: resetPasswordTokenResponse.message,
    data: resetPasswordTokenResponse.data as PasswordResetToken | null,
  });
}
