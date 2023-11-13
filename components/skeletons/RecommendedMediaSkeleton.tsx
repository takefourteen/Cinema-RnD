import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import DataFetchingMediaCardSkeleton from "./DataFetchingMediaCardSkeleton";

const RecommendedMediaSkeleton = () => {
  return (
    <div className="grid  grid-cols-2  gap-x-4 gap-y-14 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="relative w-full ">
          <AspectRatio ratio={2 / 3}>
            <CardSkeleton rows={0} />
          </AspectRatio>

          <p className="text-sm md:text-base">
            <CardSkeleton rows={1} />
          </p>
        </div>
      ))}
    </div>
  );
};

export default RecommendedMediaSkeleton;
