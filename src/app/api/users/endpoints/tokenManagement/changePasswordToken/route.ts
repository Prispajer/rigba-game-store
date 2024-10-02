import { NextRequest, NextResponse } from "next/server";
import { tokenService } from "@/utils/injector";
import { RequestResponse, ResetPasswordToken } from "@/utils/helpers/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<RequestResponse<ResetPasswordToken>>> {
  const { email, password, code } = await request.json();

  const sendChangePasswordTokenResponse =
    await tokenService.sendChangePasswordToken({ email, password }, code);

  return NextResponse.json<RequestResponse<ResetPasswordToken>>({
    success: sendChangePasswordTokenResponse.success,
    message: sendChangePasswordTokenResponse.message,
    data: sendChangePasswordTokenResponse.data,
  });
}
