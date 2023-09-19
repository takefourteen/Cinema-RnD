"use client";

import React from "react";

import HeroSignUpForm from "./HeroSignUpForm";
import MovieSearchBar from "./MovieSearchBar";

type Props = {};

function Hero({}: Props) {
  // get the screen width and always display it whenever the screen is resized
  // const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  // React.useEffect(() => {
  //   const handleResize = () => setScreenWidth(window.innerWidth);
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <section className="relative min-h-[40rem] lg:min-h-[40rem] ">
      <div className="absolute inset-0 bg-[url('/imdb-hero-bg.jpg')] bg-cover bg-center" />

      {/* adds dark overlay, over bg img */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/60" />

      <div className="master-container absolute inset-0 flex flex-col items-center justify-center gap-y-4">
        <h1 className="text-center text-[32px] font-bold leading-tight text-white  sm:leading-[inherit] md:text-4xl lg:text-5xl xl:text-[56px]">
          Unlimited movies, TV shows, <br className="sm:hidden" />{" "}
          <span>and more</span>
        </h1>
        <p className="text-xl font-semibold text-white lg:text-2xl xl:text-3xl">
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
