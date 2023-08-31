"use client";

import React from "react";
import { useForm } from "react-hook-form";

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
      <h3 className="text-center text-lg font-bold text-white">
        Ready to watch? Enter your email to create an account or continue
        watching.
      </h3>
      <input
        type="email"
        placeholder="Email address"
        {...register("email", { required: true })}
      />
      {errors.email && <span>This field is required</span>}
      <button
        type="submit"
        className="rounded-md bg-[#e50914] px-4 py-2 text-white"
      >
        Get Started
      </button>
    </form>
  );
};

export default HeroSignUpForm;
