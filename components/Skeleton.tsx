interface SkeletonProps {
  rows?: number;
}

const Skeleton = ({ rows = 1 }: SkeletonProps) => {
  return (
    <div className="h-full w-full">
      <div
        className="h-full w-full animate-pulse rounded-lg bg-slate-400"
        style={{
          animationDuration: "1s",
        }}
      />
      <div className="mt-4 flex flex-col gap-3">
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
