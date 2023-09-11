import { FaMagnifyingGlass as SearchIcon } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

/*
    Function to render the search icon when scrolled past the threshold.
    this only happens on the home screen, on other screens the search icon is always displayed
  */
const RenderSearchIcon: React.FC<{
  scroll: boolean;
  isHomeScreen: boolean;
  handleSearchClick: () => void;
}> = ({ scroll, isHomeScreen, handleSearchClick }) => {
  if (scroll && isHomeScreen) {
    return (
      <Button
        variant="ghost"
        size={"icon"}
        className="hover:bg-[#40445999] rounded-full w-12 h-12 flex items-center justify-center hover:text-white"
        onClick={handleSearchClick}
      >
        <SearchIcon className="h-5 w-5" />
      </Button>
    );
  }
  // if on another screen, always display the search icon
  if (!isHomeScreen) {
    return (
      <Button
        variant="ghost"
        size={"icon"}
        className="hover:bg-[#40445999] rounded-full w-12 h-12 flex items-center justify-center hover:text-white"
        onClick={handleSearchClick}
      >
        <SearchIcon className="h-5 w-5" />
      </Button>
    );
  }
};

export default RenderSearchIcon;
