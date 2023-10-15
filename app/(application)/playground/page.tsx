import Image from "next/image";

import logo from "@/assets/images/logos/cozycinema-logo.webp";
import logoC from "@/assets/images/logos/cozycinema-logo-c.webp";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Tabs from "@/components/application-group/playground/Tabs";

const page = () => {
  return (
    <section className="master-container flex  min-h-screen items-center justify-center">
      <Tabs />
    </section>
  );
};

export default page;

const Loader = () => {
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
            className="object-cover object-top"
          />
        </AspectRatio>
      </div>

      <div className="flex items-baseline gap-1">
        {loading.split("").map((letter, i) => (
          <span
            key={i}
            className={`animate-bounce text-xl font-bold lg:text-2xl`}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: `1.5s`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};
