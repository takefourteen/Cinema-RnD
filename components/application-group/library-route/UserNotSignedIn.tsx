import Link from "next/link";

import { BookmarkIcon2 } from "@/components/ui/icons/Icons";
import { DetailsButton } from "@/components/DetailsButton";

const UserNotSignedIn = () => {
  return (
    <section className=" master-container my-auto flex h-full flex-1 text-white">
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
          className="w-max text-sm font-bold uppercase hover:bg-[#e50914] hover:outline-none hover:ring-1 hover:ring-white hover:ring-offset-1"
          asChild
        >
          <Link href="/login?callbackUrl=/library">Sign In</Link>
        </DetailsButton>
      </div>
    </section>
  );
};

export default UserNotSignedIn;
