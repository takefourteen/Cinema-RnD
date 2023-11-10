import Link from "next/link";

import { BookmarkIcon2 } from "@/components/ui/icons/Icons";
import { DetailsButton } from "@/components/DetailsButton";
import PopcornImg from "../legecy-home-route/PopcornImg";

const UserNotSignedIn = () => {
  return (
    <div className="mt-2 flex flex-col items-center justify-center lg:mt-6">
      {/* <BookmarkIcon2 /> */}
      <PopcornImg />

      <div className="mb-4 mt-2 flex flex-col items-center justify-center text-center lg:mb-6">
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
  );
};

export default UserNotSignedIn;
