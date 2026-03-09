"use client";

import { useEffect, useRef } from "react";

export default function WaCloud() {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    let cleanup;
    import("gsap").then((mod) => {
      const gsap = mod.default ?? mod.gsap ?? mod;

      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        gsap.to(btn, {
          x: (e.clientX - cx) * 0.28,
          y: (e.clientY - cy) * 0.28,
          duration: 0.5,
          ease: "power3.out",
        });
      };

      const onLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.45)",
        });
      };

      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);

      cleanup = () => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => cleanup?.();
  }, []);

  return (
    <div className="wa-float-wrap" id="waCloud">
      {/* pulsing ring */}
      <span className="wa-pulse-ring" aria-hidden="true" />
      <span className="wa-pulse-ring wa-pulse-ring--delay" aria-hidden="true" />

      <a
        ref={btnRef}
        className="wa-float-btn"
        href="https://wa.me/447XXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a free session on WhatsApp"
      >
        {/* inner glow */}
        <span className="wa-float-glow" aria-hidden="true" />

        {/* WhatsApp icon */}
        <svg
          className="wa-float-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
            fill="#25D366"
          />
          <path
            d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.535 5.854L.057 23.428a.5.5 0 00.515.572l5.717-1.498A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.015-1.374l-.36-.214-3.732.978.999-3.64-.234-.374A9.818 9.818 0 1112 21.818z"
            fill="#25D366"
          />
        </svg>

        <span className="wa-float-label">
          <span className="wa-float-top">Book Free Session</span>
          <span className="wa-float-sub">via WhatsApp ↗</span>
        </span>
      </a>
    </div>
  );
}
