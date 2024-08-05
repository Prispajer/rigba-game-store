import { NextRequest, NextResponse } from "next/server";
import UserService from "@/utils/classes/UserService";
import IUserService from "@/utils/interfaces/IUserService";
import {
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
} from "@/utils/helpers/types";

export async function POST(request: NextRequest) {
  const { email, password, code } = await request.json();

  const userService: IUserService = new UserService(email, password, code);
  const loginResponse = await userService.loginUser();

  return NextResponse.json<
    RequestResponse<User | EmailVerificationToken | TwoFactorToken>
  >({
    success: loginResponse?.success,
    message: loginResponse?.message,
    data: loginResponse?.data,
  });
}
