type MediaImageWithDetails = {
    id: number;
    imagePath: string;
    title: string;
    rating: number;
    date: string;
    runtime?: string | null;
    numberOfSeasons?: number | null;
    priority;
  };

const MediaImageWithInfo = ({
  id,
  imagePath,
  title,
  rating,
  date,
  runtime,
  numberOfSeasons,
  priority,
}: MediaImageWithInfo) => {
  return (
    <AspectRatio ratio={4 / 3}>
      <ImageLoader
        loaderType="skeleton"
        src={imagePath}
        alt={`${title} poster`}
        fill
        priority={priority}
        className="object-cover transition-all duration-300 ease-in-out group-hover:ring-4 group-hover:ring-slate-950 group-hover:ring-offset-2 group-focus-visible:ring-4  group-focus-visible:ring-slate-950 group-focus-visible:ring-offset-2"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
        style={{ filter: "brightness(0.9)" }}
      />

      {/* overlay the image with a grain texture */}
      {/* <div className="absolute inset-0 bg-[url('/grain-texture-image.svg')] opacity-30" /> */}

      {/* small dark overlay over the top and bottom of img to make the info readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* overlay the image with some info */}
      <div className="absolute inset-0 flex flex-col justify-between p-2">
        {/* the movie rating and release date as Chip components*/}
        <div className="flex flex-wrap justify-end gap-1">
          <Chip borderStyle="border border-white/10">
            <span className="flex items-center">
              <AiFillStar className="mr-1 inline-block fill-yellow-500 text-yellow-600" />
              {rating}
            </span>
          </Chip>
          <Chip borderStyle="border border-white/10">
            {new Date(date).getFullYear()}
          </Chip>
        </div>

        {/* the movie title and runtime */}
        <div className="flex flex-row justify-between">
          <h3 className="font-small-text ml-1 truncate font-semibold text-white group-hover:underline group-focus-visible:underline">
            {title}
          </h3>
          <p className="font-small-text ml-1 text-white/80 ">
            {runtime ? runtime : `${numberOfSeasons} Seasons`}
          </p>
        </div>
      </div>
    </AspectRatio>
  );
};

export default MediaImageWithInfo;
