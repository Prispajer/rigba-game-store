import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import { RequestResponse, ResetPasswordToken } from "@/utils/helpers/types";

export async function POST(request: NextRequest, response: NextResponse) {
  const { email, code } = await request.json();

  const resetPasswordResponse = await userService.toggleTwoFactor({
    email,
    code,
  });

  return NextResponse.json<RequestResponse<ResetPasswordToken>>({
    success: resetPasswordResponse?.success,
    message: resetPasswordResponse?.message,
    data: resetPasswordResponse?.data,
  });
}
