"use client";

import React from "react";

import HeroSignUpForm from "./HeroSignUpForm";
import MovieSearchBar from "./MovieSearchBar";

type Props = {};

function Hero({}: Props) {
  // get the screen width and always display it whenever the screen is resized
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // empty array means that this effect will only run once

  return (
    <section className="relative min-h-[36rem] lg:min-h-[44rem] ">
      <div className="absolute inset-0 bg-[url('/hero-img.avif')] bg-cover bg-center" />

      {/* adds dark overlay, over bg img */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/90" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-4">
        <h1 className="text-center text-4xl font-bold text-white lg:text-5xl">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-xl text-white lg:text-2xl">
          Watch anywhere. For free.
        </p>
 
        {/* TESTING THE master-container CLASS */}
        {/* <div className="master-container w-full">
          <p className="test  w-full border text-center">{`Screen width is ${screenWidth}px`}</p>
        </div> */}

        {/* <HeroSignUpForm /> */}

        <MovieSearchBar />
      </div>
    </section>
  );
}

export default Hero;
