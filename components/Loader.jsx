"use client";

import { useEffect, useRef } from "react";

export default function Loader() {
  const containerRef = useRef(null);
  const isMobileOrTablet =
    typeof window !== "undefined" && window.innerWidth <= 1024;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const video = document.createElement("video");

    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("loop", "");
    video.setAttribute("preload", "auto");
    video.setAttribute("aria-hidden", "true");

    video.muted       = true;
    video.loop        = true;
    video.playsInline = true;
    video.className   = "loader-video";
    video.id          = "loaderVideo";
    video.src         = "/assets/videos/loader-bg.mp4";

    container.appendChild(video);

    const tryPlay = () => {
      video.muted = true;
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const onVisibility = () => { if (!document.hidden) tryPlay(); };

    video.addEventListener("canplay",    tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    document.addEventListener("visibilitychange", onVisibility);

    tryPlay();

    return () => {
      video.removeEventListener("canplay",    tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
      if (container.contains(video)) container.removeChild(video);
    };
  }, []);

  // On mobile/tablet — render nothing so the website shows immediately.
  if (isMobileOrTablet) return null;

  return <div className="loader" id="loader" ref={containerRef} />;
}
