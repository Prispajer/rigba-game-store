import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import { RegisterUserDTO } from "@/utils/helpers/backendDTO";
import { RequestResponse, User } from "@/types/types";

export async function POST(request: NextRequest, response: NextResponse) {
  const registerUserClientData = await request.json();
  const registerUserResponse = await userService.registerUser(
    registerUserClientData
  );

  return NextResponse.json<RequestResponse<User | RegisterUserDTO>>({
    success: registerUserResponse.success,
    message: registerUserResponse.message,
    data: registerUserResponse.data,
  });
}
