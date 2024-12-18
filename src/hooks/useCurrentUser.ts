"use client";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";
import { useSession } from "next-auth/react";
import { SignInProvider } from "@/utils/helpers/types";

export const signInAccount = async (
  provider: SignInProvider,
  credentials?: { email: string; password: string; code?: string }
) => {
  if (provider === "credentials") {
    await signIn(provider, {
      ...credentials,
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  } else {
    await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  }
};

export default function useCurrentUser() {
  const { data, status, update } = useSession();

  return {
    user: data ? data.user : null,
    status,
    update,
  };
}
