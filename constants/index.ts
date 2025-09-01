import { useMediaQuery } from "react-responsive";

export const useMaskSettings = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // const isMobile1 = useMediaQuery({ minWidth: 540 , maxWidth: 760 });

    const isTablet1 = useMediaQuery({ minWidth: 769, maxWidth: 888 });

  const isTablet = useMediaQuery({ minWidth: 889, maxWidth: 1029 });

  if (isMobile) {
    return {
      initialMaskPos: "50% -3200vh",
      initialMaskSize: "7300% 6029%",
      maskPos: "50% 10vh",
      maskSize: "35% 35%",
    };
  }

  //   if (isMobile1) {
  //   return {
  //     initialMaskPos: "50% -3200vh",
  //     initialMaskSize: "4881%% 5869%%",
  //     maskPos: "50% 10vh",
  //     maskSize: "35% 35%",
  //   };
  // }

  if (isTablet1) {
    return {
      initialMaskPos: "50% -2500vh",
      initialMaskSize: "5000% 5000%",
      maskPos: "50% 30vh",
      maskSize: "35% 35%",
    };
  }

  if (isTablet) {
    return {
      initialMaskPos: "50% -1500vh",
      initialMaskSize: "9000% 9000%",
      maskPos: "50% 30vh",
      maskSize: "35% 35%",
    };
  }

  return {
    initialMaskPos: "49% 32%",
    initialMaskSize: "5520% 8400%",
    maskPos: "49% 32%",
    maskSize: "40% 40%",
  };
};
