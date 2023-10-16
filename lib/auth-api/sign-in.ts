import { signIn } from "next-auth/react";

interface signInData {
  email: string;
  password: string;
}
// function to sign in the user after account creation
export async function signInUser(data: signInData) {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      throw new Error(res.error);
    }

    return res;
  } catch (error) {
    throw error;
  }
}
