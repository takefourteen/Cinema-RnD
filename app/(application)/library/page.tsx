import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { fetchUserLibrary } from "../../../lib/mongodb-api/fetchUserLibrary";

import UserNotSignedIn from "@/components/application-group/library-route/UserNotSignedIn";
import LibraryExplorerPanel from "@/components/application-group/library-route/LibraryExplorerPanel";
import LibraryList from "@/components/application-group/library-route/LibraryList";

type LibraryItem = {
  id: string;
  type: "movie" | "tv";
  title: string;
};

type LibraryPageProps = {
  searchParams?: {
    tab?: "tv" | "movie";
  };
};

const page = async ({ searchParams }: LibraryPageProps) => {
  const session = await getServerSession(authOptions);
  const tabType = searchParams?.tab || "tv";

  // the user is not logged in
  if (!session?.user) {
    return <UserNotSignedIn />;
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

  // depending on the list type, set the active tab
  const tabConfigs = [tvTabConfig, movieTabConfig];

  return (
    <section className=" relative mt-[40px] pb-[80px] pt-10 lg:mt-[60px]">
      <LibraryExplorerPanel tabConfigs={tabConfigs} panelPosition="center" urlSelectedTab={tabType}/>
    </section>
  );
};

export default page;
