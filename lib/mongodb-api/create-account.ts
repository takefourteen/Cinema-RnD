export interface createAccountData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// function to create a new account
export async function createAccount(data: createAccountData) {
  try {
    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}
