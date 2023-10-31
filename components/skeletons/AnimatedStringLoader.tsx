import React from "react";

type AnimatedStringLoaderProps = {
  loadingString: string;
  margin?:
    | "ml-0"
    | "ml-1"
    | "ml-2"
    | "ml-3"
    | "ml-4"
    | "ml-5"
    | "ml-6"
    | "ml-7"
    | "ml-8"
    | "ml-9"
    | "ml-10";
};

const AnimatedStringLoader = ({
  loadingString,
  margin = "ml-1",
}: AnimatedStringLoaderProps) => {
  return loadingString.split("").map((letter, i) => (
    <span
      key={i}
      className={`animate-bounce space-x-10 text-xl font-bold text-white lg:text-2xl ${
        i === 0 ? "" : margin
      }`}
      style={{
        animationDelay: `-${i * 0.1}s`,
        animationDuration: `1.5s`,
      }}
    >
      {letter}
    </span>
  ));
};

export default AnimatedStringLoader;
