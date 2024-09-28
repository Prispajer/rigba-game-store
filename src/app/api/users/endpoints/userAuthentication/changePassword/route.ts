import { NextRequest, NextResponse } from "next/server";
import UserService from "@/services/UserService";
import IUserService from "@/utils/interfaces/IUserService";
import { RequestResponse, User } from "@/utils/helpers/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<RequestResponse<User>>> {
  const { email, newPassword, code } = await request.json();

  const userService: IUserService = new UserService({
    email,
    newPassword,
    code,
  });

  const changePasswordResponse = await userService.changePassword();

  return NextResponse.json<RequestResponse<User>>({
    success: changePasswordResponse.success,
    message: changePasswordResponse.message,
    data: changePasswordResponse.data,
  });
}
