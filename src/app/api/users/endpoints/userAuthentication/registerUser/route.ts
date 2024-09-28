import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import IUserService from "@/utils/interfaces/IUserService";
import {
  RequestResponse,
  User,
  EmailVerificationToken,
} from "@/utils/helpers/types";

export async function POST(request: NextRequest, response: NextResponse) {
  const { email, password } = await request.json();
  const registerResponse = await userService.registerUser({ email, password });

  return NextResponse.json<RequestResponse<User | EmailVerificationToken>>({
    success: registerResponse?.success,
    message: registerResponse?.message,
    data: registerResponse?.data,
  });
}
