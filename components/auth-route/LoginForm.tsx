"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ErrorIcon } from "../Icons";
import { PiSpinnerBold } from "react-icons/pi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import Alert from "../Alert";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "dev@email.com",
      password: "developer",
    },
  });
  const router = useRouter();

  async function onSubmit(data: FormData) {
    // implement sign in in try catch finally block
    try {
      setSubmitting(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }
      router.replace("/");
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-w-[500px] flex-col items-center justify-center gap-y-8 rounded-md bg-[#dedede0f] p-12"
    >
      {/* alert error if there is one */}
      {error && <Alert value={error} />}

      {/* email */}
      <div className="grid w-full gap-2">
        <Label
          htmlFor="email"
          className="text-base font-semibold tracking-wide"
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
          className={`h-full rounded-md bg-black/30 px-6 py-3 text-base font-semibold text-white  ${
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
          className="text-base font-semibold tracking-wide"
        >
          Password *
        </Label>
        <Input
          disabled={submitting}
          {...register("password", {
            required: "Password is required",
          })}
          id="password"
          className={`h-full rounded-md bg-black/30 px-6 py-3 text-base font-semibold text-white  ${
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
        className="w-full rounded-lg border-[#c11119] bg-[#e50914] px-[25px] py-[10px] text-base font-semibold uppercase tracking-wide text-white outline outline-0 outline-[#c11119] hover:bg-[#c11119] hover:text-white hover:outline-2"
      >
        {submitting ? <PiSpinnerBold className="animate-spin" /> : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginForm;
