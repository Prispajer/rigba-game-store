import { NextRequest, NextResponse } from "next/server";
import { tokenService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<RequestResponse<ResetPasswordToken>>> {
  const changePasswordTokenClientData = await request.json();

  const sendChangePasswordTokenResponse =
    await tokenService.sendChangePasswordToken(
      {
        email: changePasswordTokenClientData.email,
        password: changePasswordTokenClientData.password,
      },
      changePasswordTokenClientData.code
    );

  return NextResponse.json<RequestResponse<ResetPasswordToken>>({
    success: sendChangePasswordTokenResponse.success,
    message: sendChangePasswordTokenResponse.message,
    data: sendChangePasswordTokenResponse.data,
  });
}
