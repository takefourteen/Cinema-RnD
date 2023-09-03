import PopcornImg from "./PopcornImg";

const ColorFulBanner = () => {
  return (
    <div className="box-shadow flex  w-full items-center justify-center gap-x-4 bg-radial-gradient p-[22px] text-white">
      <PopcornImg />

      <div className="flex flex-col gap-y-2">
        <p className="text-2xl font-bold">
          Discover the Ultimate Streaming Experience
        </p>

        <p className="text-base">Stream anytime, anywhere, on any device.</p>
        <p className="text-base">
          Start watching now with no subscription required.
        </p>
      </div>
    </div>
  );
};

export default ColorFulBanner;
