const Chip = ({
  border = true,
  children,
}: {
  border?: boolean;
  children: React.ReactNode;
}) => (
  <div
    className={`${
      border ? "border border-white/30" : ""
    } flex items-center justify-center rounded-full bg-black/30  px-2 py-1 `}
  >
    <div className="font-extra-small-text max-w-full flex-initial font-semibold leading-none tracking-wide">
      {children}
    </div>
  </div>
);

export default Chip;
