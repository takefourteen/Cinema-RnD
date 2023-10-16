import { signOut } from "next-auth/react";
import { toast } from "sonner";

export const signOutUser = async () => {
  try {
    await signOut({
      redirect: true,
      callbackUrl: "/",
    });

    toast.success("Signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
    toast.error("Failed to sign out. Please try again later.");
    throw new Error("Failed to sign out. Please try again later.");
  }
};
