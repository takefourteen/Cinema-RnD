import Link from "next/link";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { fetchUserWatchHistory } from "@/lib/mongodb-api/fetchUserWatchHistory";

import { BookmarkIcon2 } from "@/components/ui/icons/Icons";
import { DetailsButton } from "@/components/DetailsButton";
import SectionHeader from "@/components/SectionHeader";
import WatchHistoryMediaCard from "@/components/cards/WatchHistoryMediaCard";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import AnimatedStringLoader from "@/components/skeletons/AnimatedStringLoader";

const YourLibrary = async () => {
  const session = await getServerSession(authOptions);

  // if user has a session return null
  // if (session?.user) return null;

  // if user does not have a session return the component
  if (!session?.user) {
    return (
      <section className=" master-container pt-[64px] text-white lg:pt-[72px]">
        <SignInToViewYourLibrary />
      </section>
    );
  }

  // if user has a session, fetch their watch history
  const userWatchHistory = await fetchUserWatchHistory(
    session.user?.email as string,
    0,
    1,
    true,
  );

  // console.log(userWatchHistory);

  // filter out the watch history items that have duplicate ids
  const filteredUserWatchHistory = userWatchHistory.filter(
    (
      item,
      index,
      self, // self is the userWatchHistory array
    ) =>
      index === self.findIndex((t) => t.id === item.id && t.type === item.type),
  );

  return (
    <section className=" master-container pt-[64px] text-white lg:pt-[72px]">
      <SectionHeader
        sectionTitle="Your Watch History"
        viewAllLink="library?tab=history"
      />

      <ul className="flex gap-2 overflow-x-scroll">
        {filteredUserWatchHistory.length > 0 ? (
          filteredUserWatchHistory.map((item) => (
            <li key={item.id} className="w-[200px] flex-shrink-0 lg:w-[350px]">
              <Suspense
                fallback={
                  <div className=" flex flex-1 flex-col gap-x-0 gap-y-2">
                    <div className="aspect-video">
                      <CardSkeleton rows={0} />
                    </div>

                    <span className="flex h-fit">
                      <AnimatedStringLoader loadingString="..." />
                    </span>
                  </div>
                }
              >
                <WatchHistoryMediaCard
                  mediaId={item.id}
                  mediaTitle={item.title}
                  mediaType={item.type}
                  seasonNumber={item.season}
                  episodeNumber={item.episode}
                  switchLayout={false}
                  loaderType={"skeleton"}
                  priority={false}
                />
              </Suspense>
            </li>
          ))
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <BookmarkIcon2 />

            <div className="mb-6 mt-2 flex flex-col items-center justify-center text-center lg:mb-8">
              <p className="font-body-text font-bold">
                Your Watch History is empty
              </p>
              <p className="font-small-text ">
                Once you start watching, your Watch History will appear here.
              </p>
            </div>

            <DetailsButton
              variant={"primary"}
              size={"default"}
              className="w-max text-sm font-bold uppercase hover:bg-[#e50914] hover:outline-none hover:ring-1 hover:ring-slate-950 hover:ring-offset-1"
              asChild
            >
              <Link href="/">Browse Movies & TV Shows</Link>
            </DetailsButton>
          </div>
        )}
      </ul>
    </section>
  );
};

const SignInToViewYourLibrary = () => {
  return (
    <>
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
    </>
  );
};

export default YourLibrary;
