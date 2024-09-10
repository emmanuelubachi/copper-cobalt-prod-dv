import { useMediaQuery } from "react-responsive";

const useDeviceType = () => {
  const isMobile = useMediaQuery({ maxWidth: 639, minWidth: 200 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return { isMobile, isTablet, isDesktop };
};

export default useDeviceType;
