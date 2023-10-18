import { NextAuthOptions } from "next-auth";
import { connectToDatabase } from "./mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        await connectToDatabase();

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error(
            "There was a problem logging in. Check your email and password or create a free account.",
          );
        }

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt(params: any) {
      if (params.user && params.user.role) {
        params.token.role = params.user.role;
        params.token.id = params.user.id;
        params.token.email = params.user.email;
        params.token.firstName = params.user.firstName;
        params.token.lastName = params.user.lastName;
      }
      return params.token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { role: string }).role = token.role as string;
        (session.user as { email: string }).email = token.email as string;
        (session.user as { firstName: string }).firstName =
          token.firstName as string;
        (session.user as { lastName: string }).lastName =
          token.lastName as string;
      }
      return session;
    },
  },
};
