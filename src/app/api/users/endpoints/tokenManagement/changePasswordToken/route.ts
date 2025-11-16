import { NextRequest, NextResponse } from "next/server";
import { tokenService } from "@/utils/injector";
import { PasswordResetToken } from "@prisma/client";
import RequestResponse from "@/shared/types/requestResponse";

export async function POST(
  request: NextRequest
): Promise<NextResponse<RequestResponse<PasswordResetToken>>> {
  const changePasswordTokenClientData = await request.json();

  const sendChangePasswordTokenResponse =
    await tokenService.sendChangePasswordToken(
      {
        email: changePasswordTokenClientData.email,
        password: changePasswordTokenClientData.password,
      },
      changePasswordTokenClientData.code
    );

  if (!sendChangePasswordTokenResponse) {
    return NextResponse.json<RequestResponse<PasswordResetToken>>({
      success: false,
      message: "Something went wrong, no response from service.",
      data: null,
    });
  }

  return NextResponse.json<RequestResponse<PasswordResetToken>>({
    success: sendChangePasswordTokenResponse.success,
    message: sendChangePasswordTokenResponse.message,
    data: sendChangePasswordTokenResponse.data as PasswordResetToken | null,
  });
}
