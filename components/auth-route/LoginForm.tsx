"use client";

import React from "react";
import { useForm } from "react-hook-form";

import { ErrorIcon } from "../ui/Icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
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

    function onSubmit(data: FormData) {
        console.log(data);
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
            className="w-full rounded-lg border-[#c11119] bg-[#e50914] px-[25px] py-[10px] text-base font-semibold tracking-wide uppercase text-white outline outline-0 outline-[#c11119] hover:bg-[#c11119] hover:text-white hover:outline-2"
        >
            Sign In
        </Button>
    </form>
  );
};

export default LoginForm;
