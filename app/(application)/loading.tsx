import Image from "next/image";

import logo from "@/assets/images/logos/cozycinema-logo.webp";
import logoC from "@/assets/images/logos/cozycinema-logo-c.webp";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Loading() {
  const loading = "COZYCINEMA";

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-y-4 p-5 lg:gap-y-6"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%,#17003d 0%,#000000 100%)",
      }}
    >
      {/* use C logo on sm screens */}
      <div className="relative w-[75px] lg:hidden ">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={logoC}
            alt="cozycinema logo"
            fill
            sizes="(max-width: 1024px) 75px, 0px"
            className="object-cover object-top"
          />
        </AspectRatio>
      </div>

      {/* use full logo on lg screens */}
      <div className="relative hidden w-[250px] lg:flex">
        <AspectRatio ratio={21 / 9}>
          <Image
            src={logo}
            alt="cozycinema logo"
            fill
            sizes="(min-width: 1024px) 250px, 0px"
            className="object-cover object-top"
          />
        </AspectRatio>
      </div>

      <div className="flex items-baseline gap-1">
        {loading.split("").map((letter, i) => (
          <span
            key={i}
            className={`animate-bounce text-xl font-bold text-white lg:text-2xl`}
            style={{
              animationDelay: `-${i * 0.1}s`,
              animationDuration: `1.5s`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}

{
  /* map through loading and display every letter animated with a delay */
}
{
  /* <div className="flex gap-1 items-baseline">
          {loading.split("").map((letter, i) => (
            <span
              key={i}
              className={`animate-bounce text-4xl text-white/70`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {letter}
            </span>
          ))}
        </div>
        
        
        ORIGINAL LOADER
        
         <div
      className="flex absolute inset-0 items-center justify-center p-5"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%,#17003d 0%,#000000 100%)",
      }}
    >
      <span className="ml-2  flex items-center space-x-2 ">
        <div className="h-5 w-5 animate-bounce rounded-full border-2 p-1 delay-100"></div>
        <div className="h-5 w-5 animate-bounce rounded-full border-2 p-1 delay-200"></div>
        <div className="h-5 w-5 animate-bounce rounded-full border-2 p-1 delay-300"></div>
      </span>
    </div>
        
        
        
        */
}
