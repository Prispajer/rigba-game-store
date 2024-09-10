import { NextRequest, NextResponse } from "next/server";
import UserService from "@/utils/classes/UserService";
import IUserService from "@/utils/interfaces/IUserService";
import { RequestResponse, ResetPasswordToken } from "@/utils/helpers/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<RequestResponse<ResetPasswordToken>>> {
  try {
    const { email, password } = await request.json();

    const userService: IUserService = new UserService({
      email,
      password,
    });

    const sendChangePasswordTokenResponse =
      await userService.handleSendChangePasswordToken();

    return NextResponse.json<RequestResponse<ResetPasswordToken>>({
      success: sendChangePasswordTokenResponse.success,
      message: sendChangePasswordTokenResponse.message,
      data: sendChangePasswordTokenResponse.data,
    });
  } catch (error) {
    return NextResponse.json<RequestResponse<ResetPasswordToken>>({
      success: false,
      message: "Something went wrong!",
      data: undefined,
    });
  }
}
