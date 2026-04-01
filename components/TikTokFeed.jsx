"use client";

import { useState, useLayoutEffect, useEffect } from "react";
import { videos } from "@/lib/videosData";

export default function TikTokFeed() {
  const [filter, setFilter] = useState("all");
  const [showControls, setShowControls] = useState(false);

  useLayoutEffect(() => {
    setShowControls(!window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    let cleanup;
    import("@/lib/videoFeed").then(({ initVideoFeed }) => {
      cleanup = initVideoFeed();
    });
    return () => cleanup?.();
  }, [filter]);

  const filteredVideos =
    filter === "all" ? videos : videos.filter((v) => v.cat === filter);

  return (
    <section id="tiktok" className="section section--black">
      <div className="feed-intro">
        <span className="section-label section-label--light">
          WATCH ME TEACH
        </span>
        <h2 className="feed-title">Short Lessons</h2>
        <div className="feed-filters">
          <button
            type="button"
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === "algebra" ? "active" : ""}`}
            onClick={() => setFilter("algebra")}
          >
            Algebra
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === "calculus" ? "active" : ""}`}
            onClick={() => setFilter("calculus")}
          >
            Calculus
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === "fun" ? "active" : ""}`}
            onClick={() => setFilter("fun")}
          >
            Fun Facts
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === "exam" ? "active" : ""}`}
            onClick={() => setFilter("exam")}
          >
            Exam Tips
          </button>
        </div>
      </div>

      <div className="video-feed" data-lenis-prevent>
        {filteredVideos.map((v) => (
          <div key={v.id} className="video-item" data-category={v.cat}>
            <video
              className="video-player"
              controls={showControls}
              muted
              playsInline
              preload="none"
              disablePictureInPicture
              disableRemotePlayback
              poster={v.thumbnail || undefined}
              style={{ "--grad-1": v.grad1, "--grad-2": v.grad2 }}
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
