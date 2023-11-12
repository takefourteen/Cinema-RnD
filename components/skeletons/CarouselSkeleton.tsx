import AnimatedStringLoader from "./AnimatedStringLoader";
import DataFetchingMediaCardSkeleton from "./DataFetchingMediaCardSkeleton";

const CarouselSkeleton = ({
  showTitle = true,
}) => {
  return (
    <div className="master-container mt-4 flex h-full w-full flex-col">
      {showTitle && (
      <h2 className="font-header-3 flex items-baseline font-bold capitalize text-white ">
        Loading Category &nbsp; <AnimatedStringLoader loadingString="..." />
      </h2>
      )}
      <div className="mt-4 flex gap-x-2 overflow-hidden">
        {Array.from({ length: 8 }, (_, j) => (
          <DataFetchingMediaCardSkeleton key={j} loader="spinner" />
        ))}
      </div>
    </div>
  );
};

export default CarouselSkeleton;
