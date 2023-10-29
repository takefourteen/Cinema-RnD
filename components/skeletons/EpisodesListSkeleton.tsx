import { AspectRatio } from "../ui/aspect-ratio";
import AnimatedStringLoader from "./AnimatedStringLoader";
import CardSkeleton from "./CardSkeleton";

const EpisodesListSkeleton = () => {
  return (
    <div className="grid gap-x-4  gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="font-body-text absolute right-0 top-2 font-bold lg:top-4">
        <span className="flex">
          <AnimatedStringLoader loadingString="..." /> &nbsp; Episodes
        </span>
      </div>

      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="relative w-full ">
          <AspectRatio ratio={16 / 9}>
            <CardSkeleton rows={0} />
          </AspectRatio>
        </div>
      ))}
    </div>
  );
};

export default EpisodesListSkeleton;
