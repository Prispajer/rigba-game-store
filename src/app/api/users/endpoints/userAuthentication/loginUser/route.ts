import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import RequestResponse from "@/shared/types/requestResponse";
import { User }from "@prisma/client";
import { TwoFactorToken, EmailVerificationToken } from "@prisma/client";

export async function POST(request: NextRequest) {
  const loginUserClientData = await request.json();

  const loginUserResponse = await userService.loginUser(loginUserClientData);

  return NextResponse.json<
    RequestResponse<User | EmailVerificationToken | TwoFactorToken>
  >({
    success: loginUserResponse.success,
    message: loginUserResponse.message,
    data: loginUserResponse.data,
  });
}
