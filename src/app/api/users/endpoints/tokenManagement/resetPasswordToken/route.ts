import { NextRequest, NextResponse } from "next/server";
import { tokenService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";

export async function POST(request: NextRequest, response: NextResponse) {
  const { email } = await request.json();
  console.log(email);
  const resetPasswordResponse = await tokenService.sendResetPasswordToken({
    email,
  });
  return NextResponse.json<RequestResponse<ResetPasswordToken>>({
    success: resetPasswordResponse?.success,
    message: resetPasswordResponse?.message,
    data: resetPasswordResponse?.data,
  });
}
