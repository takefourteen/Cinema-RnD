import Link from "next/link";

import CustomButton from "@/components/CustomButton";
import { BookmarkIcon2 } from "@/components/Icons";
import SectionHeader from "@/components/SectionHeader";

const YourLibrary = () => {
  return (
    <section className=" master-container pt-[64px] text-white lg:pt-[72px]">
      <SectionHeader
        sectionTitle="From Your Library"
        viewAllLink="my-library"
      />

      <div className="mt-4 flex flex-col items-center justify-center lg:mt-6">
        <BookmarkIcon2 />

        <div className="mb-8 mt-2 flex flex-col items-center justify-center">
          <p className="text-base font-bold md:text-lg lg:text-xl">
            Sign in to access your Watchlist
          </p>
          <p className="text-sm md:text-base lg:text-lg">
            Save shows and movies to keep track of what you want to watch.
          </p>
        </div>

        <CustomButton asChild>
          <Link href="/sign-up">Sign Up</Link>
        </CustomButton>
      </div>
    </section>
  );
};

export default YourLibrary;
