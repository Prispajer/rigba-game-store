import { NextRequest, NextResponse } from "next/server";
import TokenService from "@/services/TokenService";
import ITokenService from "@/interfaces/ITokenService";
import { RequestResponse, ResetPasswordToken } from "@/utils/helpers/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<RequestResponse<ResetPasswordToken>>> {
  const { email, password } = await request.json();

  const tokenService: ITokenService = new TokenService({
    email,
    password,
  });

  const sendChangePasswordTokenResponse =
    await tokenService.sendChangePasswordToken();

  return NextResponse.json<RequestResponse<ResetPasswordToken>>({
    success: sendChangePasswordTokenResponse.success,
    message: sendChangePasswordTokenResponse.message,
    data: sendChangePasswordTokenResponse.data,
  });
}
