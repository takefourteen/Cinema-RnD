import Skeleton from "@/components/loadingStateComponents/Skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import React from "react";

const ListLoadingSkeleton = () => {
  return (
    <div className="grid  gap-x-4  gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="relative w-full ">
          <AspectRatio ratio={16 / 9}>
            <Skeleton rows={0} />
          </AspectRatio>
        </div>
      ))}
    </div>
  );
};

export default ListLoadingSkeleton;
