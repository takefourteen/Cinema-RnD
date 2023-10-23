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
      className={`h-9  w-9 rounded-full  border-white bg-white  text-white hover:bg-white/70 md:h-10 md:w-10 ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </DetailsButton>
  );
};

export default SliderButton;
