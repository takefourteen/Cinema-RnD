import Link from "next/link";
import { DetailsButton } from "../DetailsButton";
import { PiHouse } from "react-icons/pi";

const ComingSoon = () => {
  return (
    <div className="mx-auto flex h-full flex-1 flex-col items-center justify-center gap-1 md:max-w-[80%]">
      <h1 className="text-center text-[28px] font-bold leading-tight text-white sm:text-[32px]  sm:leading-[inherit] md:text-4xl lg:text-5xl xl:text-[56px]">
        Exciting Content is Coming Soon!
      </h1>
      <p className="text-center text-lg font-semibold tracking-wide text-white/70  lg:text-xl">
        Stay tuned for the latest updates.
      </p>
      <DetailsButton
        variant={"outline"}
        asChild
        className="font-button-text mt-2 flex h-10 gap-x-2 capitalize text-white"
      >
        <Link href="/">
          <PiHouse className="mr-0 text-xl" /> Home
        </Link>
      </DetailsButton>
    </div>
  );
};

export default ComingSoon;
