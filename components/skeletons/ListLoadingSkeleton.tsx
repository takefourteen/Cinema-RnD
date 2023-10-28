import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ListLoadingSkeleton = () => {
  return (
    <div className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
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

export default ListLoadingSkeleton;
