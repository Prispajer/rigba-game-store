"use server";

import { signOut, signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/../routes";
import { SignInProvider } from "./helpers/types";

// Session actions which needs to have "use server" syntax to work properly, doesn't work in class
export const signOutAccount = async () => {
  await signOut();
};

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
