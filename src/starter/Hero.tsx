import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useMaskSettings } from "../../constants"
import VideoPlayer2 from "./videoPlayer_2"
import { useEffect, useState } from "react"

type HeroProps = {
  id?: string;
};

const Hero = ({ id }: HeroProps) => {
  const { initialMaskPos, initialMaskSize, maskPos, maskSize } = useMaskSettings()

  const [imgSrc, setImgSrc] = useState("/images1/mb-img.png")
  const [videoSrc, setVideoSrc] = useState("https://cdn.evhomes.tech/hls/marina_vid_new/marina_vid_new_1.m3u8")

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth <= 450) {
      // 👇 Mobile
      setImgSrc("/images1/mobile-img.png")
      setVideoSrc("https://cdn.evhomes.tech/hls/marina_video_21545/marina_video_21545_1.m3u8")
    } else if (window.innerWidth > 700 && window.innerWidth <= 1000) {
      // 👇 Tablet
      setImgSrc("/images1/tablet-img.png")
      setVideoSrc("https://cdn.evhomes.tech/hls/marina_video_21545/marina_video_21545_1.m3u8")
    } else {
      // 👇 Desktop
      setImgSrc("/images1/mb-img.png")
      setVideoSrc("https://cdn.evhomes.tech/hls/marina_vid_new/marina_vid_new_1.m3u8")
    }
  }

  handleResize() // run on mount
  window.addEventListener("resize", handleResize)

  return () => window.removeEventListener("resize", handleResize)
}, [])


  useGSAP(() => {
    gsap.set(".mask-wrapper", {
      maskPosition: initialMaskPos,
      maskSize: initialMaskSize,
    })

    gsap.set(".mask-logo", { opacity: 0 })
    gsap.set(".entrance-message", { marginTop: "0vh" })

    gsap.set(".NavMain", {
      y: -100,
      opacity: 0,
      pointerEvents: "none",
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        scrub: 0.8,
        end: "+=200%",
        pin: true,

        onEnter: () => {
          gsap.to(".NavMain", {
            y: -100,
            opacity: 0,
            pointerEvents: "none",
            duration: 0.4,
            ease: "power2.out",
          })
        },
        onLeave: () => {
          gsap.to(".NavMain", {
            y: 0,
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.6,
            ease: "power2.out",
          })
        },
        onEnterBack: () => {
          gsap.to(".NavMain", {
            y: -100,
            opacity: 0,
            pointerEvents: "none",
            duration: 0.4,
            ease: "power2.out",
          })
        },
        onLeaveBack: () => {
          gsap.to(".NavMain", {
            y: 0,
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.6,
            ease: "power2.out",
          })
        },
      },
    })

    tl.to(".fade-out", { opacity: 0, ease: "power1.inOut" })
      .to(".scale-out", { scale: 1, ease: "power1.inOut", duration: 1 })
      .to(".mask-wrapper", { maskSize, maskPosition: maskPos, ease: "power1.inOut" }, "<")
      .to(".mask-wrapper", { opacity: 0 })
      .to(".fake-logo-wrapper", { opacity: 1 })
      .to(".animate-scale", { opacity: 1 }, "<")
      .to(".animate-scale", { duration: 1, ease: "power1.inOut" }, "<")
  })

  return (
    <section className="hero-section" id={id}>
      <div className="mask-wrapper">
        <img src={imgSrc} alt="background" className="scale-out mask-img" />
      </div>

      <div className="fake-logo-wrapper overlay-logo">
        <VideoPlayer2 imageSrc={videoSrc} />
      </div>
    </section>
  )
}

export default Hero
