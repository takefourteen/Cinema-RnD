const Loader = () => {
  return (
    <div className="h-full flex-col items-center justify-start gap-2">
      {/* create an array of 10  */}
      {Array.from({ length: 10 }, (_, i) => i + 1).map((_, i) => (
        <div key={i} className="mt-4 flex gap-2">
          {/* <div className="h-7 w-7 animate-pulse rounded-full bg-slate-300"></div> */}
          <div
            className="h-10 w-full animate-pulse rounded-md bg-slate-300"
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1s",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
