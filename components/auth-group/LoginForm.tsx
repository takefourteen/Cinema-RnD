"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { ErrorIcon } from "@/components/ui/icons/Icons";
import { PiSpinnerBold } from "react-icons/pi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { signInUser } from "@/lib/auth-api/sign-in";

interface FormData {
  email: string;
  password: string;
}

type LoginFormProps = {
  callbackUrl: string;
};

const LoginForm = ({ callbackUrl }: LoginFormProps) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(userData: FormData) {
    try {
      setSubmitting(true);

      // Wait for sign-in to complete
      await signInUser(userData, callbackUrl);
    } finally {
      // Set loading to false after a delay
      setTimeout(() => {
        setSubmitting(false);
      }, 500);

      // Reset the form
      reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="master-container flex  w-[90%] max-w-[500px] flex-col items-center justify-center gap-y-6 px-12 pb-6 sm:max-w-[500px]   sm:rounded-md sm:bg-[#dedede0f] sm:py-10"
    >
      {/* email */}
      <div className="grid w-full gap-2">
        <Label
          htmlFor="email"
          className="text-sm font-semibold tracking-wide md:text-base"
        >
          Email Address *
        </Label>
        <Input
          disabled={submitting}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address.",
            },
          })}
          id="email"
          className={`h-full rounded-md bg-black/30 px-2 py-3 text-sm font-semibold text-white md:text-base  ${
            errors.email ? "border border-red-500" : ""
          }`}
        />
        {errors.email && (
          <div className="flex items-center gap-2 text-red-500">
            <ErrorIcon />
            <span className="text-sm">{errors.email.message}</span>
          </div>
        )}
      </div>

      {/* password */}
      <div className="grid w-full gap-2">
        <Label
          htmlFor="password"
          className="text-sm font-semibold tracking-wide md:text-base"
        >
          Password *
        </Label>
        <Input
          disabled={submitting}
          {...register("password", {
            required: "Password is required",
          })}
          id="password"
          className={`h-full rounded-md bg-black/30 px-2 py-3 text-sm font-semibold text-white md:text-base  ${
            errors.password ? "border border-red-500" : ""
          }`}
        />
        {errors.password && (
          <div className="flex items-center gap-2 text-red-500">
            <ErrorIcon />
            <span className="text-sm">{errors.password.message}</span>
          </div>
        )}
      </div>

      {/* submit */}
      <Button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg border-[#c11119] bg-[#e50914] px-[25px] py-[10px] text-sm font-semibold uppercase tracking-wide text-white outline outline-0 outline-[#c11119] hover:bg-[#c11119] hover:text-white hover:outline-2 md:text-base"
      >
        {submitting ? (
          <>
            <PiSpinnerBold className="animate-spin" /> &nbsp; Signing You In...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
