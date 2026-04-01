/**
 * TikTok-style vertical feed: play only when a clip is mostly in view.
 */
export function initVideoFeed() {
  const feed = document.querySelector(".video-feed");
  const items = document.querySelectorAll(".video-item");
  if (!feed || items.length === 0) return () => {};

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;
  const minVisible = isMobile ? 0.45 : 0.72;

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        const video = entry.target.querySelector("video");
        if (!video) return;
        if (entry.isIntersecting && entry.intersectionRatio >= minVisible)
          video.play().catch(() => {});
        else video.pause();
      }),
    {
      root: feed,
      threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    },
  );
  items.forEach((item) => observer.observe(item));

  return () => observer.disconnect();
}
