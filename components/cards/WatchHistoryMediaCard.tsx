import Link from "next/link";

import { slugify } from "@/helpers/slugify";

import { fetchEpisodeImages, fetchImages } from "@/lib/tmdb-api/images";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageLoader from "@/components/ImageLoader";
import AlreadyWatched from "../ui/AlreadyWatched";

type WatchHistoryMediaCardProps = {
  mediaId: string;
  mediaTitle: string;
  mediaType: "movie" | "tv";
  seasonNumber: number;
  episodeNumber: number;
  loaderType: "skeleton" | "spinner";
  priority: boolean;
  switchLayout: boolean;
};

const imageBaseUrl = "https://image.tmdb.org/t/p/original/";

const WatchHistoryMediaCard = async ({
  mediaId,
  mediaTitle,
  mediaType,
  seasonNumber,
  episodeNumber,
  loaderType,
  priority,
  switchLayout,
}: WatchHistoryMediaCardProps) => {
  // Define the fetcher function based on the mediaType
  const imageFetcher: () => Promise<ImagesData | TvEpisodeImagesData> =
    mediaType === "movie"
      ? () => fetchImages(mediaId, "movie")
      : () => fetchEpisodeImages(mediaId, seasonNumber, episodeNumber);

  // Fetch the images based on the mediaType
  const images: ImagesData | TvEpisodeImagesData = await imageFetcher();

  //   prepare url path for the movie page
  const moviePageUrl =
    mediaType === "movie"
      ? `/watch-movie/${slugify(mediaTitle)}-${mediaId}`
      : null;

  //   prepare url path for the tv series page - /watch-tv/loki-84958?episode=2&season=1
  const tvSeriesPageUrl =
    mediaType === "tv"
      ? `/watch-tv/${slugify(
          mediaTitle,
        )}-${mediaId}?episode=${episodeNumber}&season=${seasonNumber}`
      : null;

  //   prepare url path for the media page
  const mediaPageUrl = mediaType === "movie" ? moviePageUrl : tvSeriesPageUrl;

  // prepare img src url
  const movieImageSrc =
    mediaType === "movie"
      ? `${imageBaseUrl}${(images as ImagesData)?.backdrops[0]?.file_path}`
      : null;
  const tvSeriesImageSrc =
    mediaType === "tv"
      ? `${imageBaseUrl}${(images as TvEpisodeImagesData)?.stills[0]
          ?.file_path}`
      : null;

  //   prepare img src url
  const imageSrc = mediaType === "movie" ? movieImageSrc : tvSeriesImageSrc;

  return (
    <Link
      href={mediaPageUrl as string}
      className={`${
        switchLayout ? "grid grid-cols-2 sm:flex sm:flex-col" : "flex flex-col"
      } group  flex-1 gap-2  `}
    >
      <AspectRatio ratio={16 / 9}>
        <ImageLoader
          loaderType={loaderType}
          src={imageSrc as string}
          alt={`${mediaTitle} poster`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
          priority={priority}
          className=" object-cover transition-all duration-300 ease-in-out group-hover:ring-4 group-hover:ring-slate-950 group-hover:ring-offset-2 group-focus-visible:ring-4  group-focus-visible:ring-slate-950 group-focus-visible:ring-offset-2"
          style={{ filter: "brightness(0.9)" }}
        />

        {/* overlay the image with a grain texture */}
        {/* <div className="absolute inset-0 bg-[url('/grain-texture-image.svg')] opacity-30" /> */}

        {/* span to show if it is a movie ot tv series styles as a chip */}
        <span
          className={`absolute left-1 top-1 bg-black bg-opacity-90 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-slate-50`}
        >
          {" "}
          {mediaType === "movie" ? "Movie" : "TV Series"}
        </span>

        {/* small dark overlay over the top and bottom of img to make the info readable */}
        <AlreadyWatched showCheckMark={false} />
      </AspectRatio>

      {/* info on card */}
      <div
        className={`${switchLayout ? "space-y-2 sm:space-y-0" : "space-y-0"}`}
      >
        <h3 className={` text-lg text-gray-200 `}>{mediaTitle}</h3>

        {/* if mediaType is tv show season and episode info */}
        {mediaType === "tv" && (
          <p className="font-small-text text-gray-400 ">
            S{seasonNumber} • E{episodeNumber}
          </p>
        )}
      </div>
    </Link>
  );
};

export default WatchHistoryMediaCard;
