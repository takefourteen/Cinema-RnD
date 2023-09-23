 const Chip = ({ children }: { children: React.ReactNode }) => (
  <div className="flex  items-center justify-center rounded-full bg-black/30  px-2 py-1  text-white">
    <div className="max-w-full flex-initial text-xs font-semibold leading-none tracking-wide xl:text-sm">
      {children}
    </div>
  </div>
);

export default Chip;