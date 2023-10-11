type ChipProps = {
  borderStyle?: string;
  children: React.ReactNode;
};

const Chip = ({
  borderStyle = "border border-white/30",
  children,
}: ChipProps) => (
  <div
    className={`${borderStyle} flex items-center justify-center rounded-full bg-black/30 px-[10px] py-[6px] text-white `}
  >
    <div className="font-extra-small-text max-w-full flex-initial font-semibold leading-none tracking-wide">
      {children}
    </div>
  </div>
);

export default Chip;
