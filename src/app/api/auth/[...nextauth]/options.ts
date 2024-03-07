import NextAuthOptions from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { queryRequests } from "@/data/database/resources/users";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Type your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Type your password",
        },
      },
      async authorize(credentials, req) {
        const user = { email: "jsmith@example.com", password: "adriankox123" };

        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {},
};
