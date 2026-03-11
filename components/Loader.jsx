"use client";

import { useEffect, useRef } from "react";

export default function Loader() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Build the video element imperatively so we can call setAttribute('muted','')
    // directly. React's JSX `muted` prop has a known bug where it never writes
    // the actual HTML attribute — only the JS property — which means iOS Safari
    // never sees the video as muted and blocks autoplay entirely.
    const video = document.createElement("video");

    // ── Critical attributes for mobile autoplay ──────────────────────────────
    video.setAttribute("muted", ""); // HTML attr — iOS Safari reads this
    video.setAttribute("playsinline", ""); // prevent iOS fullscreen takeover
    video.setAttribute("webkit-playsinline", ""); // older iOS Safari
    video.setAttribute("loop", "");
    video.setAttribute("preload", "auto");
    video.setAttribute("aria-hidden", "true");

    // ── JS properties ────────────────────────────────────────────────────────
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.className = "loader-video";
    video.id = "loaderVideo";
    video.src = "/assets/videos/loader-bg.mp4";

    container.appendChild(video);

    const tryPlay = () => {
      video.muted = true; // re-assert in case browser reset it
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const onVisibility = () => {
      if (!document.hidden) tryPlay();
    };

    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("touchstart", tryPlay, {
      once: true,
      passive: true,
    });

    tryPlay();

    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("touchstart", tryPlay);
      video.pause();
      container.removeChild(video);
    };
  }, []);

  return <div className="loader" id="loader" ref={containerRef} />;
}
