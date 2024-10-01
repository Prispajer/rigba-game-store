import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import { RequestResponse, ResetPasswordToken } from "@/utils/helpers/types";

export async function POST(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse<RequestResponse<ResetPasswordToken>>> {
  const { password, token } = await request.json();

  const setNewPasswordResponse = await userService.setNewPassword({
    password,
    token,
  });

  return NextResponse.json<RequestResponse<ResetPasswordToken>>({
    success: setNewPasswordResponse.success,
    message: setNewPasswordResponse.message,
    data: setNewPasswordResponse.data,
  });
}
