import Image from "next/image";
import { Suspense } from "react";

import Skeleton from "@/components/Skeleton";

type BackgroundPosterProps = {
  poster_path: string | null;
  backdrop_path: string | null;
  alt: string;
  priority?: boolean;
  imageClassNames?: string;
};

const BackgroundPoster = ({
  poster_path,
  backdrop_path,
  alt,
  priority,
  imageClassNames,
}: BackgroundPosterProps) => {
  return (
    <>
      {/* show the backdrop_path img on larger screens or a div with an
        overlay color if backdrop_path is null
      */}
      <div className="hidden md:flex">
        {backdrop_path ? (
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton rows={0} showOverlay={false} />{" "}
              </div>
            }
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH}${backdrop_path}`}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className={`absolute inset-0 bg-no-repeat ${imageClassNames}`}
            />
          </Suspense>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-black to-black"></div>
        )}
      </div>

      {/* show the poster_path img on smaller screens */}
      <div className="md:hidden">
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton rows={0} showOverlay={false} />{" "}
            </div>
          }
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH}${poster_path}`}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className={`absolute inset-0 bg-no-repeat ${imageClassNames}`}
          />
        </Suspense>
      </div>
    </>
  );
};

export default BackgroundPoster;
