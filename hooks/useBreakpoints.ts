import { useState, useEffect } from "react";

interface Breakpoints {
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
}

export const useBreakpoints = (): Breakpoints => {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    isXs: true,
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setBreakpoints({
        isXs: width < 576,
        isSm: width >= 576 && width < 768,
        isMd: width >= 768 && width < 992,
        isLg: width >= 992 && width < 1200,
        isXl: width >= 1200,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoints;
};


