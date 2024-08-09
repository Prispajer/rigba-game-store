"use client";
import { useSession } from "next-auth/react";

export default function useCurrentUser() {
  const { data, status, update } = useSession();

  return {
    user: data?.user,
    status,
    update,
  };
}
