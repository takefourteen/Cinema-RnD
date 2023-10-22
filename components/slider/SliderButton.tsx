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
      className={`rounded-none border-none text-white hover:bg-primaryBlack/80 ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </DetailsButton>
  );
};

export default SliderButton;
