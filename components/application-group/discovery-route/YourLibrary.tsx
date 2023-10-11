import Link from "next/link";

import { BookmarkIcon2 } from "@/components/ui/icons/Icons";
import SectionHeader from "@/components/SectionHeader";
import { DetailsButton } from "@/components/DetailsButton";

const YourLibrary = () => {
  return (
    <section className=" master-container pt-[64px] text-white lg:pt-[72px]">
      <SectionHeader
        sectionTitle="From Your Library"
        viewAllLink="my-library"
      />

      <div className="mt-6 flex flex-col items-center justify-center lg:mt-6">
        <BookmarkIcon2 />

        <div className="mb-8 mt-2 flex flex-col items-center justify-center">
          <p className="text-base font-bold md:text-lg lg:text-xl">
            Sign in to access your Watchlist
          </p>
          <p className="text-sm md:text-base lg:text-lg">
            Save shows and movies to keep track of what you want to watch.
          </p>
        </div>

        <DetailsButton
          variant={"primary"}
          size={"default"}
          className="w-max text-sm font-bold uppercase hover:outline-none hover:ring-1 hover:ring-slate-950 hover:ring-offset-1"
          asChild
        >
          <Link href="/sign-up">Sign Up</Link>
        </DetailsButton>
      </div>
    </section>
  );
};

export default YourLibrary;
