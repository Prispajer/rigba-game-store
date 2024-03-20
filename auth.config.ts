import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/utils/schemas/user";
import { queryRequests } from "@/data/database/resources/users";

export default {
  providers: [
    Credentials({
      async authorize(credentials: { email: string; password: string }) {
        const fields = LoginSchema.safeParse(credentials);

        console.log(credentials);

        if (fields.success) {
          const { email, password } = fields.data;

          const user = await queryRequests.getUser(email);

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
