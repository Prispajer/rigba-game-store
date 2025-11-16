import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/utils/injector";
import RequestResponse from "@/shared/types/requestResponse";
import { PersonalData } from "@prisma/client";

export async function POST(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse<RequestResponse<PersonalData>>> {
  const updateDataClientData = await request.json();

  const updateDataResponse = await userService.updateUserData(
    updateDataClientData
  );

  return NextResponse.json<RequestResponse<PersonalData>>({
    success: updateDataResponse.success,
    message: updateDataResponse.message,
    data: updateDataResponse.data as PersonalData | null,
  });
}
