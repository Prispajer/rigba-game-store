import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/utils/schemas/user";
import { getUserByEmail } from "@/data/database/publicSQL/queries";
import credentials from "next-auth/providers/credentials";
// import { queryRequests } from "@/data/database/resources/users";

export default {
  providers: [
    credentials({
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
