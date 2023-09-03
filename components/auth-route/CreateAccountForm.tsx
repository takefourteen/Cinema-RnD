"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { PiSpinnerBold } from "react-icons/pi";
import { ErrorIcon } from "../Icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface createAccountData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface signInData {
  email: string;
  password: string;
}

// function to create a new account
async function createAccount(data: createAccountData) {
  try {
    const res = await fetch("/api/auth/create-account", {
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

// function to sign in the user after account creation
async function signInUser(data: signInData) {
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

const CreateAccountForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "dev@email.com",
      password: "developer",
      firstName: "mynamejeff",
      lastName: "lastnamejeff",
    },
  });
  const router = useRouter();

  // function to handle form submission
  async function onSubmit(data: FormData) {
    setSubmitting(true);
    const { email, password, firstName, lastName } = data;

    try {
      const resData = await createAccount({
        email,
        password,
        firstName,
        lastName,
      });

      router.replace("/");
    } catch (createAccountError) {
      console.error(`Error creating account: ${createAccountError}`);
      return;
      // Handle create account error here if needed
    }

    // Sign in the user after account creation
    try {
      const res = await signInUser({ email, password });
      if (res?.error) {
        throw new Error(res.error);
      }
    } catch (signInError) {
      console.error(`Error signing in: ${signInError}`);
      return;
      // Handle sign in error here if needed
    }

    // Set loading to false after 1 second
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-w-[500px] flex-col items-center justify-center gap-y-8 rounded-md bg-[#dedede0f] p-12"
    >
      {/* email */}
      <div className="grid w-full gap-2">
        <Label
          htmlFor="email"
          className="text-base font-semibold tracking-wide"
        >
          Email Address *
        </Label>
        <Input
          disabled={submitting} // Disable when submitting
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address.",
            },
          })}
          id="email"
          className={`h-full rounded-md bg-black/30 px-6 py-3 text-base font-semibold text-white  ${
            errors.email ? "border border-red-500" : ""
          }`}
        />
        {errors.email && (
          <span className="flex w-full items-center gap-x-1 text-sm tracking-wider text-red-500">
            <ErrorIcon />
            {errors.email.message}
          </span>
        )}
      </div>

      {/* password */}
      <div className="grid w-full gap-2">
        <Label
          htmlFor="password"
          className="text-base font-semibold tracking-wide"
        >
          Password *
        </Label>
        <Input
          disabled={submitting} // Disable when submitting
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
          })}
          type="password"
          id="password"
          className={`h-full rounded-md bg-black/30 px-6 py-3 text-base font-semibold text-white  ${
            errors.password ? "border border-red-500" : ""
          }`}
        />
        {/* Show validation error message */}
        {errors.password && (
          <span className="flex w-full items-center gap-x-1 text-sm tracking-wider text-red-500">
            <ErrorIcon />
            {errors.password.message}
          </span>
        )}
      </div>

      {/* first name */}
      <div className="grid w-full gap-2">
        <Label
          htmlFor="firstName"
          className="text-base font-semibold tracking-wide"
        >
          First Name *
        </Label>
        <Input
          disabled={submitting} // Disable when submitting
          {...register("firstName", {
            required: "First name is required",
          })}
          id="firstName"
          className={`h-full rounded-md bg-black/30 px-6 py-3 text-base font-semibold text-white  ${
            errors.firstName ? "border border-red-500" : ""
          }`}
        />
        {errors.firstName && (
          <span className="flex w-full items-center gap-x-1 text-sm tracking-wider text-red-500">
            <ErrorIcon />
            {errors.firstName.message}
          </span>
        )}
      </div>

      {/* last name */}
      <div className="grid w-full gap-2">
        <Label
          htmlFor="lastName"
          className="text-base font-semibold tracking-wide"
        >
          Last Name *
        </Label>
        <Input
          disabled={submitting} // Disable when submitting
          {...register("lastName", {
            required: "Last name is required",
          })}
          id="lastName"
          className={`h-full rounded-md bg-black/30 px-6 py-3 text-base font-semibold text-white  ${
            errors.lastName ? "border border-red-500" : ""
          }`}
        />
        {errors.lastName && (
          <span className="flex w-full items-center gap-x-1 text-sm tracking-wider text-red-500">
            <ErrorIcon />
            {errors.lastName.message}
          </span>
        )}
      </div>

      {/* submit button */}
      <Button
        type="submit"
        disabled={submitting}
        className="mt-4 flex w-full items-center justify-center gap-x-2 rounded-md bg-[#e50914] text-base font-semibold text-white"
      >
        {submitting ? (
          <PiSpinnerBold className="animate-spin" />
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
};

export default CreateAccountForm;
