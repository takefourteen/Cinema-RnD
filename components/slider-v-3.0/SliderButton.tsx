import { DetailsButton } from "../DetailsButton";

type SliderButtonProps = {
  children: React.ReactNode;
  handleClick: () => void;
};

const SliderButton = ({
  children,
  handleClick,
  ...props
}: SliderButtonProps) => {
  return (
    <DetailsButton
      variant={"outline"}
      size={"icon"}
      className=" rounded-full border-1 border-white/30 text-white md:h-11 md:w-11 lg:h-12 lg:w-12 
"
      onClick={handleClick}
      {...props}
    >
      {children}
    </DetailsButton>
  );
};

export default SliderButton;
