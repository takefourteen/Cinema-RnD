import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./mongodb";
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

        const user = await User.findOneAndDelete({ email });
        if (!user) {
          throw new Error(
            "There was a problem logging in. Check your email and password or create an account.",
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
    jwt(params: any) {
      if (params.user.role) {
        params.token.role = params.user.role;
        params.token.id = params.user.id;
      }
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { role: string }).role = token.role as string;
      }
      return session;
    },
  },
};
