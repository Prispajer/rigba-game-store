import NextAuth from "next-auth";
import authConfig from "@/../../auth.config";
import { TypeORMAdapter } from "@auth/typeorm-adapter";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: TypeORMAdapter(
    "postgresql://e-commerce-shop_owner:************@ep-restless-bird-a2xo3kwx-pooler.eu-central-1.aws.neon.tech/e-commerce-shop?sslmode=require"
  ),
  session: { strategy: "jwt" },
  ...authConfig,
});
