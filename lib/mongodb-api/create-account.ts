import { signIn } from "next-auth/react";
import { ReactNode } from "react";
import { toast } from "sonner";

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface NewUserResponse extends NewUser {
  id: string;
}

export const createNewUser = async (
  userData: NewUser,
): Promise<NewUserResponse | string> => {
  try {
    const response = await fetch("/api/auth/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    // Sign in the user after account creation
    await signIn("credentials", {
      redirect: false,
      email: userData.email,
      password: userData.password,
    });

    // Display a success message upon successful account creation
    toast.success("Account created successfully.", {
      description: "CozyCinema Welcomes You! 🎉",
    });

    return response.json();
  } catch (error) {
    console.error("Error creating user:", error);

    // Display an empathetic message on account creation failure
    toast.error(`${error}`, {
      description: "Unable to create your account. 😔",
    });

    // Throw a meaningful error message
    throw new Error(`Error creating user: ${error}`);
  }
};
