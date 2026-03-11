"use client";

import { useEffect, useRef } from "react";

export default function Loader() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignore autoplay blocks. We'll retry on canplay/visibility/first touch.
        });
      }
    };

    tryPlay();

    const onCanPlay = () => tryPlay();
    const onVisibility = () => {
      if (!document.hidden) tryPlay();
    };
    const onFirstTouch = () => tryPlay();

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("loadeddata", onCanPlay);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("touchstart", onFirstTouch, {
      once: true,
      passive: true,
    });

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("loadeddata", onCanPlay);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("touchstart", onFirstTouch);
    };
  }, []);

  return (
    <div className="loader" id="loader">
      <video
        ref={videoRef}
        className="loader-video"
        id="loaderVideo"
        src="/assets/videos/loader-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        // older iOS Safari needs the webkit- prefixed attribute
        {...{ "webkit-playsinline": "true" }}
        aria-hidden="true"
      />
    </div>
  );
}
