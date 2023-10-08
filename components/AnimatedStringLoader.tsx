import React from "react";

type AnimatedStringLoaderProps = {
  loadingString: string;
};

const AnimatedStringLoader = ({ loadingString }: AnimatedStringLoaderProps) => {
  return loadingString.split("").map((letter, i) => (
    <span
      key={i}
      className={`animate-bounce  text-xl font-bold text-white lg:text-2xl`}
      style={{
        animationDelay: `${i * 0.1}s`,
        animationDuration: `1.5s`,
      }}
    >
      {letter}
    </span>
  ));
};

export default AnimatedStringLoader;
