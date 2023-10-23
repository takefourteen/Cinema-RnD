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
      className={`h-9  w-9 rounded-full  border-white bg-white  text-white hover:border-white/90 hover:bg-white/90 md:h-10 md:w-10 lg:h-12 lg:w-12 ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </DetailsButton>
  );
};

export default SliderButton;
