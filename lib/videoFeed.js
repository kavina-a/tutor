/**
 * TikTok-style vertical feed: play only when a clip is mostly in view
 * inside the feed, and pause everything when the section scrolls off-screen.
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

export function initVideoFeed() {
  const section = document.querySelector("#tiktok");
  const feed = document.querySelector(".video-feed");
  const items = document.querySelectorAll(".video-item");
  if (!feed || items.length === 0) return () => {};

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;
  const minVisible = isMobile ? 0.45 : 0.72;

  function pauseAllVideos() {
    feed.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.removeAttribute("data-manual-pause");
    });
  }

  /** When the Short Lessons section is off-screen, we must not keep playing. */
  function isSectionInViewport() {
    if (!section) return true;
    const r = section.getBoundingClientRect();
    const h = window.innerHeight || document.documentElement.clientHeight;
    return r.bottom > 0 && r.top < h * 0.98;
  }
  let sectionVisible = isSectionInViewport();
  if (!sectionVisible) pauseAllVideos();

  /** Pick the clip that best fills the feed and play it; used when re-entering the section. */
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
      if (item === bestItem && ratio >= minVisible && sectionVisible) {
        if (video.getAttribute("data-manual-pause") === "true") return;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.removeAttribute("data-manual-pause");
      }
    });
  }

  const itemObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        const video = entry.target.querySelector("video");
        if (!video) return;
        if (!sectionVisible) {
          video.pause();
          return;
        }
        if (entry.isIntersecting && entry.intersectionRatio >= minVisible) {
          if (video.getAttribute("data-manual-pause") === "true") return;
          video.play().catch(() => {});
        } else {
          video.pause();
          video.removeAttribute("data-manual-pause");
        }
      }),
    {
      root: feed,
      threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    },
  );
  items.forEach((item) => itemObserver.observe(item));

  let sectionObserver = null;
  if (section) {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const visible =
            e.isIntersecting && e.intersectionRatio > 0.04;
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
