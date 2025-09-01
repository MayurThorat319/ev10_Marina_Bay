import Hls from "hls.js";
import { useEffect, useRef } from "react";

export default function VideoPlayer2({ imageSrc }: { imageSrc: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (imageSrc.endsWith(".m3u8")) {
      if (Hls.isSupported()) {
        // Works on Chrome, Firefox, etc.
        const hls = new Hls();
        hls.loadSource(imageSrc);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native Safari support
        video.src = imageSrc;
      }
    } else {
      video.src = imageSrc;
    }

    // Try autoplay programmatically
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked, wait for user interaction
        const unlock = () => {
          video.play();
          document.removeEventListener("touchstart", unlock);
          document.removeEventListener("click", unlock);
        };
        document.addEventListener("touchstart", unlock, { once: true });
        document.addEventListener("click", unlock, { once: true });
      });
    }
  }, [imageSrc]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      webkit-playsinline="true"
      x-webkit-airplay="allow"
      controls={false}
      className="overlay-logo"
    >
      Your browser does not support the video tag.
    </video>
  );
}
 