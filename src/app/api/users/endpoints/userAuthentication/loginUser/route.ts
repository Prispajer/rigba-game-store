import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import {
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
} from "@/utils/helpers/types";

export async function POST(request: NextRequest) {
  const { email, password, code } = await request.json();

  const loginResponse = await userService.loginUser({ email, password, code });

  return NextResponse.json<
    RequestResponse<User | EmailVerificationToken | TwoFactorToken>
  >({
    success: loginResponse?.success,
    message: loginResponse?.message,
    data: loginResponse?.data,
  });
}
