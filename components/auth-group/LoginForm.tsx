"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { PiSpinnerBold } from "react-icons/pi";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { ErrorIcon } from "@/components/ui/icons/Icons";
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  // function to handle form submission
  const onSubmit = async (userData: FormData) => {
    try {
      setSubmitting(true);

      // Wait for sign-in to complete
      await signInUser(
        {
          ...userData,
          email: userData.email.toLowerCase(),
        },
        callbackUrl,
      );
    } finally {
      // Set loading to false after a delay
      setTimeout(() => {
        setSubmitting(false);
      }, 500);

      // Reset the form
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="master-container flex w-[90%] max-w-[500px] flex-col items-center justify-center gap-y-8 px-4 pb-6 sm:max-w-[500px] sm:rounded-md sm:bg-[#dedede0f] sm:py-10"
    >
      {/* Email */}
      <div className="grid w-full gap-2">
        <Label
          htmlFor="email"
          className="font-small-text font-semibold tracking-wide"
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
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : ""}
          className={`font-body-text h-10 rounded-md bg-black/30 px-2 font-semibold text-white  ${
            errors.email ? "border border-red-500" : ""
          }`}
        />
        {errors.email && (
          <div
            id="email-error"
            className="mt-1 flex items-center gap-2 text-red-500"
          >
            <ErrorIcon />
            <span className="text-sm">{errors.email.message}</span>
          </div>
        )}
      </div>

      {/* Password */}
      <div className="grid w-full gap-2">
        <Label
          htmlFor="password"
          className="font-small-text font-semibold tracking-wide"
        >
          Password *
        </Label>

        <div className="relative">
          <Input
            disabled={submitting}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            type={showPassword ? "text" : "password"}
            id="password"
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : ""}
            className={`font-body-text h-10 rounded-md bg-black/30 px-2 font-semibold text-white  ${
              errors.password ? "border border-red-500" : ""
            }`}
          />

          {/* Password visibility toggle */}
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer"
            onClick={toggleShowPassword}
          >
            <button
              type="button"
              aria-label={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? (
                <PiEye className="h-5 w-5 text-white" />
              ) : (
                <PiEyeClosed className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>
        {errors.password && (
          <div
            id="password-error"
            className="mt-1 flex items-center gap-2 text-red-500"
          >
            <ErrorIcon />
            <span className="text-sm">{errors.password.message}</span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={submitting}
        className="font-button-text mt-4 w-full gap-x-2 rounded-md bg-[#e50914] font-semibold text-white transition-colors hover:bg-[#e50914]/70 "
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
