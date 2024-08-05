import { NextRequest, NextResponse } from "next/server";
import UserService from "@/utils/classes/UserService";
import IUserService from "@/utils/interfaces/IUserService";
import {
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
} from "@/utils/helpers/types";

export async function POST(request: NextRequest, response: NextResponse) {
  const { email, password } = await request.json();

  const userService: IUserService = new UserService(email, password);
  const registerResponse = await userService.registerUser();

  return NextResponse.json<RequestResponse<User | EmailVerificationToken>>({
    success: registerResponse?.success,
    message: registerResponse?.message,
    data: registerResponse?.data,
  });
}
