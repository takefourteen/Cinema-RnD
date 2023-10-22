import Link from "next/link";
import { getServerSession } from "next-auth";

import { BookmarkIcon2 } from "@/components/ui/icons/Icons";
import SectionHeader from "@/components/SectionHeader";
import { DetailsButton } from "@/components/DetailsButton";

const YourLibrary = async () => {
  const session = await getServerSession();

  // if user has session return null
  if (session?.user) return null;

  return (
    <section className=" master-container pt-[64px] text-white lg:pt-[72px]">
      <SectionHeader sectionTitle="From Your Library" viewAllLink="library" />

      <div className="mt-6 flex flex-col items-center justify-center lg:mt-6">
        <BookmarkIcon2 />

        <div className="mb-6 mt-2 flex flex-col items-center justify-center text-center lg:mb-8">
          <p className="font-body-text font-bold">
            Sign in to access your Watchlist
          </p>
          <p className="font-small-text ">
            Save shows and movies to keep track of what you want to watch.
          </p>
        </div>

        <DetailsButton
          variant={"primary"}
          size={"default"}
          className="w-max text-sm font-bold uppercase hover:bg-[#e50914] hover:outline-none hover:ring-1 hover:ring-slate-950 hover:ring-offset-1"
          asChild
        >
          <Link href="/sign-up">Sign Up</Link>
        </DetailsButton>
      </div>
    </section>
  );
};

export default YourLibrary;
