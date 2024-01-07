import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import AnimatedStringLoader from "./AnimatedStringLoader";

const LibraryListSkeleton = () => {
  return (
    <div>
      <h1 className="pb-6 text-4xl font-bold">
        <span className="flex">
          Saved &nbsp; <AnimatedStringLoader loadingString="..." />
        </span>
      </h1>

      <ul className="grid grid-cols-2 gap-x-2 gap-y-12 sm:grid-cols-3 md:grid-cols-4 md:gap-y-16 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 18 }, (_, i) => i + 1).map((_, i) => (
          <li key={i} className="relative">
            <AspectRatio ratio={2 / 3}>
              <CardSkeleton rows={0} showOverlay={false} />
            </AspectRatio>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LibraryListSkeleton;
