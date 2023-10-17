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
    const signInData = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (signInData?.error) {
      throw new Error(signInData.error);
    }

    // Display a welcoming message upon successful sign-in
    toast.success("Welcome back! Let's start streaming. 🎬");
  } catch (error) {
    console.error("Error signing in:", error);

    // Display an empathetic message on sign-in failure
    toast.error("Oh no! Unable to sign you in. Please try again. 😔", {
      description: `${error}`,
    });

    // Throw a meaningful error message
    throw new Error(`Error signing in: ${error}`);
  }
}
