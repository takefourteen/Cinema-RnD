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
    <div className="max-w-full flex-initial text-xs font-semibold leading-none tracking-wide xl:text-sm">
      {children}
    </div>
  </div>
);

export default Chip;
