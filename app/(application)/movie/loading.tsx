const loading = () => {
  // const loading = "...";

  return (
    <div
      className="flex h-screen items-center justify-center p-5"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%,#17003d 0%,#000000 100%)",
      }}
    >
      <span className="ml-2  flex items-center space-x-2 ">
        <div className="h-5 w-5 animate-bounce rounded-full border-2 p-1 delay-100"></div>
        <div className="h-5 w-5 animate-bounce rounded-full border-2 p-1 delay-200"></div>
        <div className="h-5 w-5 animate-bounce rounded-full border-2 p-1 delay-300"></div>
      </span>
    </div>
  );
};

export default loading;

{
  /* map through loading and display every letter animated with a delay */
}
{
  /* <div className="flex gap-1 items-baseline">
          {loading.split("").map((letter, i) => (
            <span
              key={i}
              className={`animate-bounce text-4xl text-white/70`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {letter}
            </span>
          ))}
        </div> */
}
