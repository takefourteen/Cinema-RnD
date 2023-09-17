import PopcornImg from "./PopcornImg";

const ColorFulBanner = () => {
  return (
    <section className="box-shadow flex  w-full items-center justify-center gap-x-4 bg-radial-gradient p-6 text-white">
      <div className="mr-2">
        <PopcornImg />
      </div>

      <div className="flex flex-col gap-y-2">
        <p className="text-xl font-bold md:text-2xl lg:text-3xl">
          Discover the Ultimate Streaming Experience
        </p>

        <p className="text-sm md:text-base lg:text-lg">
          Stream anytime, anywhere, on any device.
        </p>
        <p className="text-sm md:text-base lg:text-lg">
          Start watching now, no subscription required.
        </p>
      </div>
    </section>
  );
};

export default ColorFulBanner;
