import { FC } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import CardSkeleton from "./CardSkeleton";
import LoadingSpinner from "./LoadingSpinner";

type DataFetchingMediaCardSkeletonProps = {
  loader: "spinner" | "skeleton";
};

const DataFetchingMediaCardSkeleton: FC<DataFetchingMediaCardSkeletonProps> = ({
  loader,
}) => {
  return (
    <div className="relative h-auto min-w-[150px] sm:min-w-[170px] md:min-w-[180px] lg:min-w-[215px] xl:min-w-[250px] 2xl:min-w-[300px]">
      <AspectRatio ratio={2 / 3}>
        {loader === "spinner" ? (
          <LoadingSpinner />
        ) : (
          <CardSkeleton rows={0} showOverlay={false} />
        )}
      </AspectRatio>
    </div>
  );
};

export default DataFetchingMediaCardSkeleton;
