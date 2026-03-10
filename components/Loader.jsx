"use client";

import { useEffect, useRef } from "react";

export default function Loader() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React doesn't reliably apply the `muted` HTML attribute — set it as a
    // DOM property so mobile browsers (iOS Safari, Android Chrome) honour it
    // and allow autoplay without user interaction.
    video.muted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was blocked — silently ignore; the loader will still fade
        // out via the GSAP timeline in animations.js.
      });
    }
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
        // older iOS Safari needs the webkit- prefixed attribute
        {...{ "webkit-playsinline": "true" }}
        aria-hidden="true"
      />
      <div className="loader-center" id="loaderCenter">
        <span className="loader-word" id="loaderWord" />
      </div>
    </div>
  );
}
