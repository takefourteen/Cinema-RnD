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

    return response.json();
  } catch (error) {
    return `Error creating user: ${error}`;
  }
};
