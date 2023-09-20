interface SkeletonProps {
  rows?: number;
  mainItemHeight?: number;
}

const Skeleton = ({ rows = 1, mainItemHeight = 50 }: SkeletonProps) => {
  return (
    <div className="flex flex-1 flex-col">
      <div
        className="w-full animate-pulse rounded-lg bg-slate-400"
        style={{
          animationDuration: "1s",
          minHeight: `${mainItemHeight}px`,
        }}
      />
      <div className="mt-4 flex flex-col gap-2">
        {Array.from({ length: rows }, (_, i) => i + 1).map((_, i) => (
          <div
            key={i}
            className="h-3 w-full animate-pulse rounded-lg bg-slate-300"
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1s",
              width: `${Math.floor(Math.random() * 71) + 30}%`, // Generates a random number between 30 and 100 (inclusive)
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
