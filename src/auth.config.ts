import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/utils/schemas/user";
import { getUserByEmail } from "@/data/database/publicSQL/queries";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Discord from "@auth/core/providers/discord";
// import { queryRequests } from "@/data/database/resources/users";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials: { email: string; password: string }) {
        const fields = LoginSchema.safeParse(credentials);

        if (fields.success) {
          const { email, password } = fields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return user;
          }
        }
        return;
      },
    }),
  ],
} satisfies NextAuthConfig;
