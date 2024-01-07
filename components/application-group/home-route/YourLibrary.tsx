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
import Carousel from "../Carousel";
import PopcornImg from "../legecy-home-route/PopcornImg";
import UserNotSignedIn from "../library-route/UserNotSignedIn";

const YourLibrary = async () => {
  const session = await getServerSession(authOptions);

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

  // if watch history is empty
  if (filteredUserWatchHistory.length === 0) {
    return (
      <section className=" master-container pt-[64px] text-white lg:pt-[72px]">
        <SectionHeader
          sectionTitle="Your Watch History"
          viewAllLink="library?tab=history"
        />

        <div className="mt-2 flex flex-col items-center justify-center lg:mt-6">
          {/* <BookmarkIcon2 /> */}
          <PopcornImg />

          <div className="mb-6 mt-2 flex flex-col items-center justify-center text-center lg:mb-8">
            <p className="font-body-text font-bold">
              Your Watch History is empty
            </p>
            <p className="font-small-text ">
              Once you start watching, your Watch History will appear here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className=" master-container pt-[64px] text-white lg:pt-[72px]">
      <SectionHeader
        sectionTitle="Your Watch History"
        viewAllLink="library?tab=history"
      />

      <Carousel translateSliderBtnBy100>
        {filteredUserWatchHistory.map((item) => (
          <li
            key={item.id}
            className="w-[200px] flex-shrink-0 md:w-[250px] lg:w-[350px]"
            style={{
              scrollSnapAlign: "start",
              scrollMargin: "0 10px",
            }}
          >
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
        ))}
      </Carousel>
    </section>
  );
};

const SignInToViewYourLibrary = () => {
  return (
    <>
      <SectionHeader sectionTitle="From Your Library" />
      <UserNotSignedIn />
    </>
  );
};

export default YourLibrary;
