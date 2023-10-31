import { PiCheck } from "react-icons/pi";

const AlreadyWatched = () => {
  return (
    <div className="absolute inset-0 z-10 flex w-full items-center justify-center bg-black/40">
      <PiCheck className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16" />
    </div>
  );
};

export default AlreadyWatched;
