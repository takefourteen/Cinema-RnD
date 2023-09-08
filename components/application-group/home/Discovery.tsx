import React from "react";

const Discovery = () => {
  return (
    <section className=" flex flex-col gap-y-8">
      <div className="flex flex-col items-center justify-center gap-y-4 px-4 py-16 text-center">
        <h2 className="text-3xl font-bold capitalize text-white lg:text-4xl">
          Discover what to watch next: <br /> movies, tv shows and so much more.
        </h2>
        <p className="max-w-lg  text-base text-white lg:text-lg">
          With so many movies and tv shows to choose from, you&apos;ll never get
          bored.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-4 px-4 py-16 text-center">
        <h2 className="text-3xl font-bold capitalize text-white lg:text-4xl">
          Keep track of what you&apos;ve watched and want to watch.
        </h2>
        <p className="max-w-lg  text-base text-white lg:text-lg">
          Save your favorites easily and always have something to watch.
        </p>
      </div>
    </section>
  );
};

export default Discovery;
