import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import { User, RequestResponse } from "@/types/types";
import { PasswordResetToken } from "@prisma/client";

export async function POST(request: NextRequest, response: NextResponse) {
  const resetPasswordClientData = await request.json();

  const resetPasswordResponse = await userService.toggleTwoFactor(
    resetPasswordClientData
  );

  return NextResponse.json<RequestResponse<PasswordResetToken>>({
    success: resetPasswordResponse?.success,
    message: resetPasswordResponse?.message,
    data: resetPasswordResponse?.data as PasswordResetToken | null,
  });
}
