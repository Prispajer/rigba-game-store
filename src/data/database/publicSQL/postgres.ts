import { PrismaClient } from "@prisma/client";

declare global {
  var postgres: PrismaClient | undefined;
}

export const postgres = globalThis.postgres || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.postgres = postgres;
