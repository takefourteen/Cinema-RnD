import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Metadata, ResolvingMetadata } from "next";

import { fetchUserLibrary } from "../../../lib/mongodb-api/fetchUserLibrary";

import UserNotSignedIn from "@/components/application-group/library-route/UserNotSignedIn";
import LibraryExplorerPanel from "@/components/application-group/library-route/LibraryExplorerPanel";
import LibraryList from "@/components/application-group/library-route/LibraryList";
import WatchHistory from "@/components/application-group/library-route/WatchHistory";

type LibraryItem = {
  id: string;
  type: "movie" | "tv";
  title: string;
};

type LibraryPageProps = {
  searchParams?: {
    tab?: "tv" | "movie" | "history";
  };
};

// ========== METADATA ========== //
// export const metadata: Metadata = {
//   title: "Your CozyCinema Library - Explore a World of Entertainment",
//   description:
//     "Welcome to your personal CozyCinema Library, where a vast array of movies and TV shows awaits. Dive into a curated collection spanning genres like drama, comedy, action, and more. Enjoy unlimited streaming, all for free. CozyCinema - Your haven for high-quality, cost-free entertainment.",
// };

// metadata depending on whether the user is logged in or not
type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
};
export async function generateMetadata(): Promise<
  ResolvingMetadata | Metadata
> {
  const session = await getServerSession(authOptions);

  // Default metadata for users not logged in
  let metadata: Metadata = {
    title: "Your CozyCinema Library - Explore a World of Entertainment",
    description:
      "Welcome to your personal CozyCinema Library, where a vast array of movies and TV shows awaits. Dive into a curated collection spanning genres like drama, comedy, action, and more. Enjoy unlimited streaming, all for free. CozyCinema - Your haven for high-quality, cost-free entertainment.",
  };

  // If the user is logged in, update metadata
  if (session?.user) {
    const userInSession = session.user as User;
    metadata = {
      title: `Welcome back, ${userInSession.firstName}, Explore Your CozyCinema Library`,
      description:
        "Discover and enjoy a vast array of movies and TV shows in your personalized CozyCinema Library. Dive into a curated collection spanning genres like drama, comedy, action, and more. Enjoy unlimited streaming, all for free. CozyCinema - Your haven for high-quality, cost-free entertainment.",
    };
  }

  return metadata;
}

const page = async ({ searchParams }: LibraryPageProps) => {
  const session = await getServerSession(authOptions);
  const tabType = searchParams?.tab || "tv";

  // the user is not logged in
  if (!session?.user) {
    return (
      <section className=" master-container my-auto flex h-full flex-1 text-white">
        <UserNotSignedIn />;
      </section>
    );
  }

  const userLibrary = await fetchUserLibrary(session.user?.email as string);

  // Separate items into movies and TV shows
  const { movies, tvShows }: { movies: LibraryItem[]; tvShows: LibraryItem[] } =
    userLibrary.reduce(
      (acc, item) => {
        if (item.type === "movie") {
          acc.movies.push(item as LibraryItem);
        } else if (item.type === "tv") {
          acc.tvShows.push(item as LibraryItem);
        }
        return acc;
      },
      { movies: [] as LibraryItem[], tvShows: [] as LibraryItem[] },
    );

  // config for the tabs
  const movieTabConfig = {
    key: "movies",
    title: "Movies",
    content: (
      <LibraryList
        libraryItems={movies}
        userEmail={session.user?.email as string}
      />
    ),
  };

  const tvTabConfig = {
    key: "tv-series",
    title: "TV Series",
    content: (
      <LibraryList
        libraryItems={tvShows}
        userEmail={session.user?.email as string}
      />
    ),
  };

  const watchHistoryTabConfig = {
    key: "history",
    title: "History",
    content: (
      <Suspense
        fallback={<h1 className="text-4xl font-bold">Watch History</h1>}
      >
        <WatchHistory userEmail={session.user?.email as string} />
      </Suspense>
    ),
  };

  // depending on the list type, set the active tab
  const tabConfigs = [tvTabConfig, movieTabConfig, watchHistoryTabConfig];

  return (
    <section className="master-container relative mt-[72px] w-full pb-[80px] pt-10 lg:mt-[92px]">
      <LibraryExplorerPanel
        tabConfigs={tabConfigs}
        panelPosition="center"
        urlSelectedTab={tabType}
      />
    </section>
  );
};

export default page;
