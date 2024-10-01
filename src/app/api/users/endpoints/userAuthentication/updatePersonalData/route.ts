import { NextRequest, NextResponse } from "next/server";
import UserService from "@/services/UserService";
import IUserService from "@/interfaces/IUserService";
import { RequestResponse, ResetPasswordToken } from "@/utils/helpers/types";

export async function POST(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse<RequestResponse<ResetPasswordToken>>> {
  const {
    email,
    fullName,
    birthDate,
    address,
    state,
    zipCode,
    city,
    country,
    phoneNumber,
  } = await request.json();

  const userService: IUserService = new UserService({
    email,
    fullName,
    birthDate,
    address,
    state,
    zipCode,
    city,
    country,
    phoneNumber,
  });
  const setNewPasswordResponse = await userService.updatePersonalData({
    fullName,
    birthDate,
    address,
    state,
    zipCode,
    city,
    country,
    phoneNumber,
  });

  return NextResponse.json<RequestResponse<ResetPasswordToken>>({
    success: setNewPasswordResponse.success,
    message: setNewPasswordResponse.message,
    data: setNewPasswordResponse.data,
  });
}
