import { NextRequest, NextResponse } from "next/server";
import UserService from "@/utils/classes/UserService";
import IUserService from "@/utils/interfaces/IUserService";
import { RequestResponse, User } from "@/utils/helpers/types";

export async function POST(request: NextRequest, response: NextResponse) {
  const { email, password, token } = await request.json();

  const userService: IUserService = new UserService({
    email,
    password,
    token,
  });
  const changePasswordResponse = await userService.handleChangePassword();

  return NextResponse.json<RequestResponse<User>>({
    success: changePasswordResponse.success,
    message: changePasswordResponse.message,
    data: changePasswordResponse.data,
  });
}
