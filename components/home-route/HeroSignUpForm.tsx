"use client";

import React from "react";
import { useForm } from "react-hook-form";

import { IoChevronForwardSharp } from "react-icons/io5";
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

const ErrorIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-name="CircleX"
      role="img"
      className="translate-y-[-1px]"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export default HeroSignUpForm;
