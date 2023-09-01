import React from "react";

import HeroSignUpForm from "./HeroSignUpForm";

type Props = {};

function Hero({}: Props) {
  return (
    <section className="relative min-h-[32rem]">
      <div className="absolute inset-0 bg-[url('/hero-img.avif')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-bl from-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.9)]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-4">
        <h1 className="text-5xl font-bold text-white">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-2xl text-white">Watch anywhere. For free.</p>

        <HeroSignUpForm />

      </div>
    </section>
  );
}


export default Hero;
