import { NextRequest, NextResponse } from "next/server";
import TokenService from "@/utils/services/TokenService";
import ITokenService from "@/utils/interfaces/ITokenService";
import { RequestResponse, ResetPasswordToken } from "@/utils/helpers/types";

export async function POST(request: NextRequest, response: NextResponse) {
  const { email } = await request.json();

  const tokenService: ITokenService = new TokenService({ email });

  const resetPasswordResponse =
    await tokenService.handleSendResetPasswordToken();
  return NextResponse.json<RequestResponse<ResetPasswordToken>>({
    success: resetPasswordResponse?.success,
    message: resetPasswordResponse?.message,
    data: resetPasswordResponse?.data,
  });
}
