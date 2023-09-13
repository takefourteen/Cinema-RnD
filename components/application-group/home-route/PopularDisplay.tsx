"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { CgSpinner } from "react-icons/cg";
import { BsArrowRight } from "react-icons/bs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

const orgininalImageBasePath = process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH;
const imageBaseUrl = process.env.NEXT_PUBLIC_TMBD_IMG_PATH;

type MediaItem = {
  id: number;
  poster_path: string | null;
  original_title?: string;
  original_name?: string;
};

type PopularDisplayProps = {
  sectionTitle: string;
  data: MediaItem[];
  viewAllLink: string;
};

const PopularDisplay = ({
  sectionTitle,
  data,
  viewAllLink,
}: PopularDisplayProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Handle the image loading
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-baseline justify-between px-4">
        <h2 className="text-2xl font-bold capitalize text-white md:text-3xl">
          {sectionTitle}
        </h2>
        <Button
          asChild
          variant={"link"}
          className=" group p-0  text-base text-white md:text-lg"
        >
          <Link href={viewAllLink}>
            View All
            <BsArrowRight className="ml-2 h-4 w-4 font-bold group-hover:scale-[120%] group-hover:transition-all" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2  gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.slice(0, 6).map(
          (media) =>
            // Check if the media has a valid poster_path before rendering
            media.poster_path ? (
              <MediaCard
                key={media.id}
                media={media}
                isLoading={isLoading}
                handleImageLoad={handleImageLoad}
              />
            ) : null, // Skip rendering if poster_path is not available
        )}
      </div>
    </div>
  );
};

const MediaCard = ({
  media,
  isLoading,
  handleImageLoad,
}: {
  media: MediaItem;
  isLoading: boolean;
  handleImageLoad: () => void;
}) => (
  <div
    key={media.id}
    className="relative  h-auto  w-full max-w-[175px] justify-self-center lg:max-w-[200px]"
  >
    {/* Show loading spinner while image loads */}
    {isLoading && (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
        <CgSpinner className="animate-spin text-white" size={32} />
      </div>
    )}
    <AspectRatio ratio={2 / 3}>
      <Image
        src={`${orgininalImageBasePath}${media.poster_path}`}
        alt={media.original_title || media.original_name || "Media"}
        fill
        className="object-cover"
        onLoad={handleImageLoad}
      />
    </AspectRatio>
    {/* Display the media title */}
    <p className="mt-2 text-start text-sm text-white md:text-base">
      {media.original_title || media.original_name || "Unknown Title"}
    </p>
  </div>
);

export default PopularDisplay;
