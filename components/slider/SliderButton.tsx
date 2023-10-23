import { DetailsButton } from "../DetailsButton";

type SliderButtonProps = {
  children: React.ReactNode;
  handleClick: () => void;
  className?: string;
};

const SliderButton = ({
  children,
  handleClick,
  className,
  ...props
}: SliderButtonProps) => {
  return (
    <DetailsButton
      variant={"outline"}
      size={"icon"}
      className={`h-9 w-9 rounded-full border-none ring ring-white text-white hover:bg-white/50 lg:h-11 lg:w-11 ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </DetailsButton>
  );
};

export default SliderButton;
