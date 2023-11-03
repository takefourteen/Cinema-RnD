import { PiCheck } from "react-icons/pi";

type Props = {
  showCheckMark: boolean;
};

const AlreadyWatched = ({ showCheckMark }: Props) => {
  // generate a random number between 90 and 98
  const randomNumber = Math.floor(Math.random() * (98 - 90 + 1) + 90);

  return (
    <div
      className={`absolute inset-0 z-10 flex w-full items-center justify-center ${
        showCheckMark ? "bg-black/50" : ""
      }`}
    >
      {showCheckMark && (
        <PiCheck className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16" />
      )}

      <span
        className="absolute bottom-0 left-0 h-1 bg-primaryRed"
        style={{
          width: `${randomNumber}%`,
        }}
      />
    </div>
  );
};

export default AlreadyWatched;
