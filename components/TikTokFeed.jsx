"use client";

import { useState, useLayoutEffect, useEffect } from "react";
import { videos, videoFilters } from "@/lib/videosData";

/** Minimal stroke icons — speaker + slash / waves */
function IconVolumeOff() {
  return (
    <svg
      className="video-action__icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <polygon
        points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line
        x1="17"
        y1="9"
        x2="23"
        y2="15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="23"
        y1="9"
        x2="17"
        y2="15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconVolumeOn() {
  return (
    <svg
      className="video-action__icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <polygon
        points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function TikTokFeed() {
  const [filter, setFilter] = useState("all");
  const [showControls, setShowControls] = useState(false);
  /** Mobile: start muted (autoplay); user toggles with the overlay button */
  const [muted, setMuted] = useState(true);

  useLayoutEffect(() => {
    setShowControls(!window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    if (showControls) return;
    document.querySelectorAll(".video-feed video").forEach((v) => {
      v.muted = muted;
      if (!muted) v.play().catch(() => {});
    });
  }, [muted, showControls]);

  useEffect(() => {
    let cleanup;
    import("@/lib/videoFeed").then(({ initVideoFeed }) => {
      cleanup = initVideoFeed();
    });
    return () => cleanup?.();
  }, [filter]);

  const filteredVideos =
    filter === "all"
      ? videos
      : videos.filter((v) => v.filterKey === filter);

  return (
    <section id="tiktok" className="section section--black">
      <div className="feed-intro">
        <span className="section-label section-label--light">
          WATCH ME TEACH
        </span>
        <h2 className="feed-title">Short Lessons</h2>
        <div className="feed-filters">
          {videoFilters.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`filter-btn ${filter === key ? "active" : ""}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="video-feed" data-lenis-prevent>
        {filteredVideos.map((v) => (
          <div
            key={v.id}
            className="video-item"
            data-category={v.cat}
            data-filter-key={v.filterKey}
          >
            <video
              className="video-player"
              controls={showControls}
              playsInline
              preload="none"
              disablePictureInPicture
              disableRemotePlayback
              poster={v.thumbnail || undefined}
              style={{ "--grad-1": v.grad1, "--grad-2": v.grad2 }}
              {...(showControls
                ? { defaultMuted: true }
                : { muted })}
            >
              <source src={v.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-overlay">
              <div className="video-overlay__left">
                <strong className="video-handle">@kavina.math</strong>
                <p className="video-title">{v.title}</p>
                <span className="video-tag">{v.tags}</span>
              </div>
              <div className="video-overlay__right">
                {!showControls && (
                  <button
                    type="button"
                    className="video-action video-action--mute"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMuted((m) => !m);
                    }}
                    aria-label={muted ? "Turn sound on" : "Turn sound off"}
                    aria-pressed={!muted}
                  >
                    {muted ? <IconVolumeOff /> : <IconVolumeOn />}
                    <span>{muted ? "Sound" : "Mute"}</span>
                  </button>
                )}
                <button type="button" className="video-action">
                  &hearts;<span>{v.likes}</span>
                </button>
                <button type="button" className="video-action">
                  &#128172;<span>{v.comments}</span>
                </button>
                <button type="button" className="video-action">
                  &#8599;<span>Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
