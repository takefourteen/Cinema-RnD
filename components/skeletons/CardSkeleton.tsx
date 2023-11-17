import { AspectRatio } from "../ui/aspect-ratio";
import "./CardSkeleton.css";

interface CardSkeletonProps {
  rows?: number;
  showOverlay?: boolean;
}

const CardSkeleton = ({ rows = 1, showOverlay = true }: CardSkeletonProps) => {
  return (
    <div className="relative flex h-full flex-1 flex-col">
      {/* <div
        className={`${
          rows >= 1 ? "aspect-[9/16] bg-red-600" : "gradientAnimation"
        }  h-full w-full `}
      /> */}

      {rows >= 1 ? (
        <AspectRatio ratio={2 / 3}>
          <div className="gradientAnimation h-full w-full" />
        </AspectRatio>
      ) : (
        <div className="gradientAnimation h-full w-full" />
      )}

      {rows >= 1 && (
        <div className="mt-2 flex flex-col gap-2">
          {Array.from({ length: rows }, (_, i) => i + 1).map((_, i) => (
            <div
              key={i}
              className="gradientAnimation h-3 w-full"
              style={{
                width: `${Math.floor(Math.random() * 71) + 30}%`, // Generates a random number between 30 and 100 (inclusive)
              }}
            />
          ))}
        </div>
      )}
      {/* overlay the image with a grain texture if rows are === 0 and showOver*/}
      {rows === 0 && showOverlay && (
        <div className="absolute inset-0 bg-[url('/grain-texture-image.svg')] opacity-30" />
      )}
    </div>
  );
};

export default CardSkeleton;
