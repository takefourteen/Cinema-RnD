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

    toast.success("Account created successfully");

    return response.json();
  } catch (error) {
    console.error("Error creating user:", error);
    toast.error(`${error}`);
    throw new Error(`Error creating user: ${error}`);
  }
};
