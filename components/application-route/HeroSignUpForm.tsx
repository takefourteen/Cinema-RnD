"use client";

import React from "react";
import { useForm } from "react-hook-form";

import { IoChevronForwardSharp } from "react-icons/io5";
import { ErrorIcon } from "../ui/Icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface FormData {
  email: string;
}

type Props = {};

const HeroSignUpForm = (props: Props) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    // design email input and "Get Started" button like the netflix signup page
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-y-4"
    >
      <h3 className="text-center text-lg  text-white">
        Ready to watch? Enter your email to create an account or continue
        watching.
      </h3>

      <div className="flex h-[3.5rem] w-full items-center justify-center gap-x-4">
        <Input
          //   type="email"
          placeholder="Email address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address.",
            },
          })}
          className={`h-full rounded-lg bg-black/30 px-6 py-3 text-2xl font-semibold text-white placeholder:text-white ${
            errors.email ? "border border-red-500" : ""
          }`}
        />

        <Button
          type="submit"
          className={` h-full min-w-max bg-[#e50914] px-6 py-3 text-2xl font-semibold text-white  hover:bg-[#c11119] `}
        >
          Get Started <IoChevronForwardSharp className="ml-2 h-6 w-6" />
        </Button>
      </div>

      {/* show error msg, if ther is any */}
      {errors.email && (
        <span className="flex w-full items-center gap-x-1 text-sm tracking-wider text-red-500">
          <ErrorIcon />
          {errors.email.message}
        </span>
      )}
    </form>
  );
};



export default HeroSignUpForm;
