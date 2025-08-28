import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useMaskSettings } from "../../constants"
import VideoPlayer2 from "../components/videoPlayer_2"

const Hero = () => {
  const { initialMaskPos, initialMaskSize, maskSize } = useMaskSettings()

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
      .to(".mask-wrapper", { maskSize, ease: "power1.inOut" }, "<")
      .to(".mask-wrapper", { opacity: 0 })
      .to(".fake-logo-wrapper", { opacity: 1 })
      .to(
        ".animate-scale",
        {
          opacity: 1,
        },
        "<",
      )
      .to(
        ".animate-scale",
        {
          duration: 1,
          ease: "power1.inOut",
        },
        "<",
      )
  })

  return (
    <section className="hero-section">
      <div className="mask-wrapper">
        <img src="/images/bg-img-1.jpg" alt="background" className="scale-out mask-img"  />
      </div>

      <div className="fake-logo-wrapper overlay-logo">
        <VideoPlayer2 imageSrc={"https://cdn.evhomes.tech/hls/marina_vid_1/marina_vid_1.m3u8"}/>
        {/* <video className="overlay-logo" src="/images1/marina_vid.mp4" autoPlay loop muted playsInline /> */}
      </div>
    </section>
  )
}

export default Hero
