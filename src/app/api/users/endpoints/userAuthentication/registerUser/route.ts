import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import { RequestResponse, User } from "@/utils/helpers/types";

export async function POST(request: NextRequest, response: NextResponse) {
  const registerUserClientData = await request.json();
  const registerUserResponse = await userService.registerUser(
    registerUserClientData
  );

  return NextResponse.json<RequestResponse<User | EmailVerificationToken>>({
    success: registerUserResponse.success,
    message: registerUserResponse.message,
    data: registerUserResponse.data,
  });
}
