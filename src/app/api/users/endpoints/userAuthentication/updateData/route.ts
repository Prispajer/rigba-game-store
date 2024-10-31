import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { PersonalData } from "@prisma/client";

export async function POST(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse<RequestResponse<PersonalData>>> {
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

  const updateDataResponse = await userService.updateUserData({
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

  return NextResponse.json<RequestResponse<PersonalData>>({
    success: updateDataResponse.success,
    message: updateDataResponse.message,
    data: updateDataResponse.data,
  });
}
