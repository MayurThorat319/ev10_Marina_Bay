import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useMaskSettings } from "../../constants";
import ComingSoon from "./ComingSoon";

const Hero = () => {
  const { initialMaskPos, initialMaskSize, maskPos, maskSize } =
    useMaskSettings();

  useGSAP(() => {
    gsap.set(".mask-wrapper", {
      maskPosition: initialMaskPos,
      maskSize: initialMaskSize,
    });

    gsap.set(".mask-logo", {  opacity: 0 });

    gsap.set(".entrance-message", { marginTop: "0vh" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        scrub: 2.5,
        end: "+=400%",
        pin: true,
      },
    });

    tl.to(".fade-out", { opacity: 0, ease: "power1.inOut" })
      .to(".scale-out", { scale: 1, ease: "power1.inOut" })
      .to(".mask-wrapper", { maskSize, ease: "power1.inOut" }, "<")
      .to(".mask-wrapper", { opacity: 0 })
      .to(
        ".overlay-logo",
        {
          opacity: 1,
          onComplete: () => {
            gsap.to(".overlay-logo", { opacity: 0 });
          },
        },
        "<"
      )
      .to(
        ".entrance-message",
        {
          duration: 1,
          ease: "power1.inOut",
          maskImage:
            "radial-gradient(circle at 50% 0vh, black 50%, transparent 100%)",
        },
        "<"
      );
  });

  return (
    <section className="hero-section">
      <div className="size-full mask-wrapper">
        <img
          src="/images/bg.png"
          alt="background"
          className="scale-out mask-img"
        />
        {/* <img
          src="/images/hero-text-1.png"
          alt="hero-logo"
          className="title-logo fade-out"
          style={{
            objectFit: "contain",
            width: 682,
          }}
        /> */}
        {/* <img
          src="/images/watch-trailer.png"
          alt="trailer"
          className="trailer-logo fade-out"
        /> */}
        {/* <div className="play-img fade-out">
          <img
            src="https://cdn.evhomes.tech/fe03fe9d-b3a2-4882-94e5-eabbec1f63a2-10-marina-bay-logo-golden.png"
            alt="play" */}

        {/* // className="w-7 ml-1"
          /> */}
        {/* <img src="/images/play.png" alt="play" className="w-7 ml-1" /> */}
        {/* </div> */}
      </div>

      <div>
        <img
          src="/images/AAA-text3.svg"
          alt="logo"
          className="size-full object-cover mask-logo"
        />
      </div>

      <div className="fake-logo-wrapper">
          {/* <video
    src="/images/video-1.mp4"
   
    autoPlay
    loop
    muted
    playsInline  /> */}
      </div>

      <ComingSoon />
    </section>
  );
};

export default Hero;
