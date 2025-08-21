import { useMediaQuery } from "react-responsive";

export const useMaskSettings = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  if (isMobile) {
    return {
      initialMaskPos: "50% -1500vh",
      initialMaskSize: "3100% 3100%",
      maskPos: "50% 7vh",
      maskSize: "50% 50%",
    };
  }

  if (isTablet) {
    return {
      initialMaskPos: "50% -1700vh",
      initialMaskSize: "4500% 4500%",
      maskPos: "50% 17vh",
      maskSize: "30% 30%",
    };
  }

  return {
    initialMaskPos: "49% 32%",
    initialMaskSize: "5520% 8400%",
    maskPos: "49% 32%",
    maskSize: "20% 20%",
  };
};
