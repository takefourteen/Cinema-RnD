import PopcornImg from "./PopcornImg";

const ColorFulBanner = () => {
  return (
    <section className="box-shadow flex  w-full items-center justify-center gap-x-4 bg-radial-gradient p-6 text-white">
      <div className="mr-2">
        <PopcornImg />
      </div>

      <div className="flex flex-col gap-y-2">
        <p className="text-xl font-bold lg:text-2xl">
          Discover the Ultimate Streaming Experience
        </p>

        <p className="text-sm lg:text-base">
          Stream anytime, anywhere, on any device.
        </p>
        <p className="text-sm lg:text-base">
          Start watching now with no subscription required.
        </p>
      </div>
    </section>
  );
};

export default ColorFulBanner;
