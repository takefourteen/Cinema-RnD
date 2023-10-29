import ImageLoader from "@/components/ImageLoader";

type BackgroundPosterProps = {
  poster_path: string;
  backdrop_path: string | null;
  alt: string;
  priority?: boolean;
  imageClassNames?: string;
};

const BASE_IMG_URL = process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH;

const ResponsiveBackgroundPoster = ({
  poster_path,
  backdrop_path,
  alt,
  priority,
  imageClassNames,
}: BackgroundPosterProps) => {
  const backdropImgSrc = backdrop_path
    ? `${BASE_IMG_URL}${backdrop_path}`
    : null;
  const posterImgSrc = `${BASE_IMG_URL}${poster_path}`;

  return (
    <>
      {/* 
         show the backdrop_path img on larger screens.
         if backdrop_path is null, use the poster_path
      */}
      <div className="relative ml-auto flex aspect-[2/3] h-full w-full md:w-[60%] lg:aspect-video">
        <ImageLoader
          loaderType="spinner"
          src={`${backdropImgSrc ? backdropImgSrc : posterImgSrc}`}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (min-width: 769px) 60vw"
          className={`object-cover ${imageClassNames}`}
        />
      </div>
    </>
  );
};

export default ResponsiveBackgroundPoster;
