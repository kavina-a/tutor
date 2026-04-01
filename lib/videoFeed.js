/**
 * TikTok-style vertical feed: play when a clip is mostly in view, hard-stop (pause + seek 0)
 * when you leave it, with hysteresis so scroll doesn’t flicker play/pause.
 */

function overlapHeight(a, b) {
  const top = Math.max(a.top, b.top);
  const bottom = Math.min(a.bottom, b.bottom);
  return Math.max(0, bottom - top);
}

function visibleHeightRatio(itemRect, feedRect) {
  const oh = overlapHeight(itemRect, feedRect);
  return itemRect.height > 0 ? oh / itemRect.height : 0;
}

function hardStopVideo(video) {
  video.pause();
  try {
    video.currentTime = 0;
  } catch (_) {
    /* ignore */
  }
  video.removeAttribute("data-manual-pause");
}

export function initVideoFeed() {
  const section = document.querySelector("#tiktok");
  const feed = document.querySelector(".video-feed");
  const items = document.querySelectorAll(".video-item");
  if (!feed || items.length === 0) return () => {};

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;
  /** Need this much of the clip visible in the feed to auto-play */
  const minPlay = isMobile ? 0.45 : 0.72;
  /** Below this ratio we consider the clip “left” — pause + reset (hysteresis vs minPlay) */
  const leaveThreshold = isMobile ? 0.12 : 0.15;

  function pauseAllVideos() {
    feed.querySelectorAll("video").forEach((v) => hardStopVideo(v));
  }

  function isSectionInViewport() {
    if (!section) return true;
    const r = section.getBoundingClientRect();
    const h = window.innerHeight || document.documentElement.clientHeight;
    return r.bottom > 0 && r.top < h * 0.98;
  }
  let sectionVisible = isSectionInViewport();
  if (!sectionVisible) pauseAllVideos();

  function refreshFeedPlayback() {
    const feedRect = feed.getBoundingClientRect();
    let bestItem = null;
    let bestOverlap = 0;
    items.forEach((item) => {
      const ir = item.getBoundingClientRect();
      const oh = overlapHeight(ir, feedRect);
      if (oh > bestOverlap) {
        bestOverlap = oh;
        bestItem = item;
      }
    });

    items.forEach((item) => {
      const video = item.querySelector("video");
      if (!video) return;
      const ir = item.getBoundingClientRect();
      const ratio = visibleHeightRatio(ir, feedRect);

      if (item !== bestItem) {
        hardStopVideo(video);
        return;
      }

      if (!sectionVisible) {
        hardStopVideo(video);
        return;
      }

      if (ratio < leaveThreshold) {
        hardStopVideo(video);
        return;
      }

      if (ratio >= minPlay) {
        if (video.getAttribute("data-manual-pause") === "true") return;
        video.play().catch(() => {});
      }
      /* minPlay > ratio >= leaveThreshold: dead zone — keep current state (no flicker) */
    });
  }

  const itemObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        const video = entry.target.querySelector("video");
        if (!video) return;

        if (!sectionVisible) {
          hardStopVideo(video);
          return;
        }

        const r = entry.intersectionRatio;
        const inRoot = entry.isIntersecting;

        if (!inRoot || r < leaveThreshold) {
          hardStopVideo(video);
          return;
        }

        if (r >= minPlay) {
          if (video.getAttribute("data-manual-pause") === "true") return;
          video.play().catch(() => {});
        }
      }),
    {
      root: feed,
      threshold: [0, 0.08, 0.12, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.72, 0.85, 1],
    },
  );
  items.forEach((item) => itemObserver.observe(item));

  let sectionObserver = null;
  if (section) {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const visible = e.isIntersecting && e.intersectionRatio > 0.04;
          sectionVisible = visible;
          if (!visible) pauseAllVideos();
          else
            requestAnimationFrame(() => {
              requestAnimationFrame(refreshFeedPlayback);
            });
        });
      },
      { root: null, threshold: [0, 0.04, 0.15, 0.35, 0.55, 0.75, 1] },
    );
    sectionObserver.observe(section);
  }

  function onVisibilityChange() {
    if (document.hidden) pauseAllVideos();
    else if (sectionVisible)
      requestAnimationFrame(() => {
        requestAnimationFrame(refreshFeedPlayback);
      });
  }
  document.addEventListener("visibilitychange", onVisibilityChange);

  return () => {
    itemObserver.disconnect();
    sectionObserver?.disconnect();
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };
}
