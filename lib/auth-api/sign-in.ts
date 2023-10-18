import { signIn } from "next-auth/react";
import { toast } from "sonner";

interface SignInData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

// Function to sign in the user after account creation
export async function signInUser(data: SignInData, callbackUrl: string) {
  try {
    const signInData = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (signInData?.error) {
      throw new Error(signInData.error);
    }

    // Display a welcoming message upon successful sign-in
    toast.success("Welcome back!", {
      description: "Let's start streaming. 🎬",
      descriptionClassName: "text-blue-500 font-bold",
    });

    // Redirect to the callback URL if provided
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.href = callbackUrl;
  } catch (error) {
    console.error("Error signing in:", error);

    // Display an empathetic message on sign-in failure
    toast.error(`${error}`);

    // Throw a meaningful error message
    throw new Error(`Error signing in: ${error}`);
  }
}
