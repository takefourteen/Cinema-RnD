import { signIn } from "next-auth/react";
import { toast } from "sonner";

interface SignInData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

// Function to sign in the user after account creation
export async function signInUser(data: SignInData) {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      throw new Error(res.error);
    }

    // Display a welcoming message upon successful sign-in
    toast.success("Welcome back! Let's start streaming. 🎬");

    return res;
  } catch (error) {
    console.error("Error signing in:", error);

    // Display an empathetic message on sign-in failure
    toast.error("Oh no! Unable to sign you in. Please try again. 😔");

    // Throw a meaningful error message
    throw error;
  }
}
