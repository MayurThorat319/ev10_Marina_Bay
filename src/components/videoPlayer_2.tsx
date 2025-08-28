import Hls from "hls.js";
import { useEffect, useRef } from "react";

export default function VideoPlayer2({ imageSrc }: { imageSrc: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      // If it's an HLS stream and supported
      if (imageSrc.endsWith(".m3u8")) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(imageSrc);
          hls.attachMedia(videoRef.current);
        } else if (
          videoRef.current.canPlayType("application/vnd.apple.mpegurl")
        ) {
          // For Safari
          videoRef.current.src = imageSrc;
        }
      } else {
        // Normal MP4 etc
        videoRef.current.src = imageSrc;
      }
    }
  }, [imageSrc]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className="overlay-logo"
    >
      Your browser does not support the video tag.
    </video>
  );
}
