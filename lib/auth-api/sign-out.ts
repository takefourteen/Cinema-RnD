import { signOut } from "next-auth/react";
import { toast } from "sonner";

export const signOutUser = async () => {
  try {
    await signOut({
      redirect: true,
      callbackUrl: "/",
    });

    // Display a somber message upon successful sign-out
    toast.success("You've been logged out. We'll miss you. 😢");
  } catch (error) {
    console.error("Error signing out:", error);

    // Display an empathetic message on sign-out failure
    toast.error("Oops, something went wrong. Can't let you go just yet! 🛑");

    // Throw a meaningful error message
    throw new Error("Failed to sign out. Please try again later.");
  }
};
