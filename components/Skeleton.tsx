import "./Skeleton.css";

interface SkeletonProps {
  rows?: number;
  mainItemHeight?: number;
  showOverlay?: boolean;
}

const Skeleton = ({
  rows = 1,
  mainItemHeight = 50,
  showOverlay = true,
}: SkeletonProps) => {
  return (
    <div className="relative flex h-full flex-1 flex-col">
      <div
        className="gradientAnimation h-full w-full"
        style={{
          // animationDuration: "1s",
          minHeight: `${mainItemHeight}px`,
        }}
      />
      {rows >= 1 && (
        <div className="mt-4 flex flex-col gap-2">
          {Array.from({ length: rows }, (_, i) => i + 1).map((_, i) => (
            <div
              key={i}
              className="gradientAnimation h-3 w-full"
              style={{
                // animationDelay: `${i * 0.1}s`,
                // animationDuration: "1s",
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

export default Skeleton;
