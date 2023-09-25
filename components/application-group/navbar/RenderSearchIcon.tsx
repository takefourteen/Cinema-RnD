import { FaMagnifyingGlass as SearchIcon } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

/*
    Function to render the search icon when scrolled past the threshold.
    this only happens on the home screen, on other screens the search icon is always displayed
  */
const RenderSearchIcon: React.FC<{
  scroll: boolean;
  isHomeScreen: boolean;
  toggleSearchBar: () => void;
}> = ({ scroll, isHomeScreen,  toggleSearchBar }) => {
  // function that opens and closes the searchbar when the searh icon is clicked
  function handleSearchClick() {
    /*
    if the search bar is open do nothing, because it will close
    when user clicks outside the searchbar anyways - (check NavbarSearhBar.tsx)
    */

    toggleSearchBar();
  }

  if (scroll && isHomeScreen) {
    return (
      <Button
        variant="ghost"
        size={"icon"}
        className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-[#40445999] hover:text-white"
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
        className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-[#40445999] hover:text-white"
        onClick={handleSearchClick}
      >
        <SearchIcon className="h-5 w-5" />
      </Button>
    );
  }
};

export default RenderSearchIcon;
