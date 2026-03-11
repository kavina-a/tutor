/**
 * Kavina — Math Tutor Portfolio
 * Client-side animation module — GSAP + Lenis (npm)
 * Called once from app/page.jsx inside useEffect.
 */

export function initAnimations() {
  // Dynamic imports ensure this code only ever runs in the browser
  return (async () => {
    const gsapMod = await import("gsap");
    const gsap = gsapMod.default ?? gsapMod.gsap ?? gsapMod;
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    const LenisMod = await import("lenis");
    const Lenis = LenisMod.default ?? LenisMod.Lenis ?? LenisMod;

    gsap.registerPlugin(ScrollTrigger);

    const IS_TOUCH = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const SECTIONS = document.querySelectorAll(".section");
    const DOTS = document.querySelectorAll(".dot-nav .dot");

    let lenis;

    /* ══════════════════════════════════════════════════════════
       1. PAGE LOADER
       ══════════════════════════════════════════════════════════ */
    function initLoader() {
      const loader = document.getElementById("loader");
      const loaderVideo = document.getElementById("loaderVideo");

      if (!loader) {
        initLenis();
        initHeroAnimations();
        initScrollAnimations();
        initReviews();
        initVideoFeed();
        initWaCloud();
        if (!IS_TOUCH) {
          initCustomCursor();
          initCardRepel();
          initMagneticButton();
        } else {
          initCardIdleAnimation();
        }
        return;
      }

      const tryPlayLoaderVideo = () => {
        if (!loaderVideo) return;
        loaderVideo.muted = true;
        loaderVideo.defaultMuted = true;
        const playPromise = loaderVideo.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {});
        }
      };

      const tl = gsap.timeline({
        onStart: () => {
          tryPlayLoaderVideo();
        },
        onComplete: () => {
          initLenis();
          initHeroAnimations();
          initScrollAnimations();
          initReviews();
          initVideoFeed();
          initWaCloud();
          if (!IS_TOUCH) {
            initCustomCursor();
            initCardRepel();
            initMagneticButton();
          } else {
            initCardIdleAnimation();
          }
        },
      });

      tl.to({}, { duration: 1.8 })
        .to(loader, { opacity: 0, duration: 0.6, ease: "power2.inOut" })
        .set(loader, { display: "none" });
    }

    initLoader();

    /* ══════════════════════════════════════════════════════════
       2. LENIS SMOOTH SCROLL
       ══════════════════════════════════════════════════════════ */
    function initLenis() {
      lenis = new Lenis({
        lerp: 0.07,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.5,
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      DOTS.forEach((dot) => {
        dot.addEventListener("click", (e) => {
          e.preventDefault();
          const target = document.querySelector(dot.getAttribute("href"));
          if (target) lenis.scrollTo(target, { offset: 0, duration: 1.5 });
        });
      });
    }

    /* ══════════════════════════════════════════════════════════
       3. CUSTOM CURSOR
       ══════════════════════════════════════════════════════════ */
    function initCustomCursor() {
      const cursor = document.querySelector(".cursor");
      const follower = document.querySelector(".cursor-follower");
      let mouseX = 0,
        mouseY = 0,
        cursorX = 0,
        cursorY = 0,
        followerX = 0,
        followerY = 0;

      document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      gsap.ticker.add(() => {
        cursorX += (mouseX - cursorX) * 0.25;
        cursorY += (mouseY - cursorY) * 0.25;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        gsap.set(cursor, { x: cursorX, y: cursorY });
        gsap.set(follower, { x: followerX, y: followerY });
      });

      const interactives = document.querySelectorAll(
        "a, button, .topic-card, .chapter-card, .cta-button, .chat-card",
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursor.classList.add("is-hover");
          follower.classList.add("is-hover");
        });
        el.addEventListener("mouseleave", () => {
          cursor.classList.remove("is-hover");
          follower.classList.remove("is-hover");
        });
      });
    }

    /* ══════════════════════════════════════════════════════════
       4. HERO ENTRANCE ANIMATIONS
       ══════════════════════════════════════════════════════════ */
    function initHeroAnimations() {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(".hero-name .char", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
      })
        .to(
          ".hero-top",
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        )
        .to(
          ".topic-card",
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            onStart: () => {
              document.querySelectorAll(".topic-card").forEach((card) => {
                gsap.set(card, {
                  rotation: parseFloat(card.dataset.baseRotation) || 0,
                  x: parseFloat(card.dataset.baseX) || 0,
                  y: 0,
                });
              });
            },
          },
          "-=0.3",
        )
        .to(
          ".hero-tagline",
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .to(
          ".marquee",
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .to(
          ".scroll-indicator",
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        )
        .to(
          ".dot-nav",
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        );
    }

    /* ══════════════════════════════════════════════════════════
       5. CARD CURSOR-REPEL
       ══════════════════════════════════════════════════════════ */
    function initCardRepel() {
      const cards = document.querySelectorAll(".topic-card");
      const cardStack = document.getElementById("cardStack");
      const INFLUENCE_RADIUS = 300;
      const REPEL_STRENGTH = 70;

      document.addEventListener("mousemove", (e) => {
        const stackRect = cardStack.getBoundingClientRect();
        if (
          e.clientY < stackRect.top - 200 ||
          e.clientY > stackRect.bottom + 200 ||
          e.clientX < stackRect.left - 200 ||
          e.clientX > stackRect.right + 200
        ) {
          cards.forEach((card) => {
            gsap.to(card, {
              x: parseFloat(card.dataset.baseX) || 0,
              y: 0,
              rotation: parseFloat(card.dataset.baseRotation) || 0,
              duration: 1,
              ease: "elastic.out(1, 0.4)",
              overwrite: "auto",
            });
          });
          return;
        }
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const cardCenterY = rect.top + rect.height / 2;
          const dx = e.clientX - cardCenterX;
          const dy = e.clientY - cardCenterY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const baseRotation = parseFloat(card.dataset.baseRotation) || 0;
          const baseX = parseFloat(card.dataset.baseX) || 0;

          if (distance < INFLUENCE_RADIUS) {
            const force = (1 - distance / INFLUENCE_RADIUS) * REPEL_STRENGTH;
            const angle = Math.atan2(dy, dx);
            gsap.to(card, {
              x: baseX + -Math.cos(angle) * force,
              y: -Math.sin(angle) * force,
              rotation: baseRotation + -Math.cos(angle) * force * 0.12,
              duration: 0.4,
              ease: "elastic.out(1, 0.3)",
              overwrite: "auto",
            });
          } else {
            gsap.to(card, {
              x: baseX,
              y: 0,
              rotation: baseRotation,
              duration: 0.8,
              ease: "elastic.out(1, 0.5)",
              overwrite: "auto",
            });
          }
        });
      });
    }

    function initCardIdleAnimation() {
      document.querySelectorAll(".topic-card").forEach((card) => {
        const baseRotation = parseFloat(card.dataset.baseRotation) || 0;
        const baseX = parseFloat(card.dataset.baseX) || 0;
        gsap.set(card, { rotation: baseRotation * 0.6, x: baseX * 0.5 });
        gsap.to(card, {
          y: "random(-8, 8)",
          rotation: baseRotation * 0.6 + gsap.utils.random(-2, 2),
          duration: "random(2, 3.5)",
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: "random(0, 1.5)",
        });
      });
    }

    /* ══════════════════════════════════════════════════════════
       6. SCROLL-TRIGGERED ANIMATIONS
       ══════════════════════════════════════════════════════════ */
    function initScrollAnimations() {
      // Dot nav active state
      SECTIONS.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (!self.isActive) return;
            DOTS.forEach((d) => d.classList.remove("active"));
            if (DOTS[i]) DOTS[i].classList.add("active");
            const dotNav = document.querySelector(".dot-nav");
            if (
              section.classList.contains("section--dark") ||
              section.classList.contains("section--black")
            ) {
              dotNav.classList.add("is-light");
            } else {
              dotNav.classList.remove("is-light");
            }
          },
        });
      });

      // Hide scroll indicator on scroll
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "200px top",
        onLeave: () =>
          gsap.to(".scroll-indicator", { opacity: 0, duration: 0.3 }),
        onEnterBack: () =>
          gsap.to(".scroll-indicator", { opacity: 1, duration: 0.3 }),
      });

      // Horizontal scroll chapter carousel
      const track = document.querySelector(".chapters-track");
      if (track) {
        const totalScroll = track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: ".chapters-section",
            pin: true,
            scrub: 1,
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
          },
        });
      }

      // Stats counters
      document.querySelectorAll(".stat").forEach((stat) => {
        const numberEl = stat.querySelector(".stat__number");
        const target = parseFloat(stat.dataset.target);
        const isDecimal = target % 1 !== 0;
        ScrollTrigger.create({
          trigger: stat,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(
              { val: 0 },
              {
                val: target,
                duration: 2,
                ease: "power2.out",
                onUpdate: function () {
                  numberEl.textContent = isDecimal
                    ? this.targets()[0].val.toFixed(1)
                    : Math.floor(this.targets()[0].val);
                },
              },
            );
          },
        });
      });

      // Reviews header
      gsap.from(".reviews-header", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: "#reviews", start: "top 70%" },
      });

      // Free Trial CTA words
      const ctaWords = gsap.utils.toArray(".cta-word");
      const origins = [
        { x: -100, rotation: -5 },
        { x: 100, rotation: 5 },
        { x: -80, rotation: -3 },
        { x: 0, rotation: 0 },
        { x: 0, rotation: 0, scale: 0.5 },
      ];
      ctaWords.forEach((word, i) =>
        gsap.set(word, {
          x: origins[i]?.x || 0,
          rotation: origins[i]?.rotation || 0,
          scale: origins[i]?.scale || 1,
        }),
      );

      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#free-trial",
          start: "top 60%",
          end: "center center",
          scrub: 1,
        },
      });
      ctaWords.forEach((word, i) =>
        ctaTl.to(
          word,
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotation: 0,
            scale: 1,
            duration: 0.3,
            ease: "power3.out",
          },
          i * 0.1,
        ),
      );

      gsap.to(".cta-bottom", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cta-bottom", start: "top 85%" },
      });

      // TikTok intro
      gsap.from(".feed-intro", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: "#tiktok", start: "top 70%" },
      });

      // Floating symbols parallax
      gsap.utils.toArray(".float-sym").forEach((sym) => {
        gsap.to(sym, {
          y: "random(-50, 50)",
          x: "random(-30, 30)",
          scrollTrigger: {
            trigger: "#free-trial",
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      });
    }

    /* ══════════════════════════════════════════════════════════
       7. REVIEWS — swipeable chat stack
       ══════════════════════════════════════════════════════════ */
    function initReviews() {
      const cards = gsap.utils.toArray(".chat-card");
      const dotsContainer = document.getElementById("chatDots");
      const hint = document.getElementById("chatHint");
      const total = cards.length;
      let currentIndex = 0,
        isSwiping = false,
        startX = 0,
        dragX = 0;
      let velocityX = 0,
        lastPX = 0,
        lastTime = 0,
        animating = false;
      let idleTween = null,
        labelEl = null;

      if (dotsContainer) {
        cards.forEach((_, i) => {
          const dot = document.createElement("span");
          dot.className = "chat-dot" + (i === 0 ? " is-active" : "");
          dotsContainer.appendChild(dot);
        });
      }

      function updateDots() {
        if (!dotsContainer) return;
        dotsContainer
          .querySelectorAll(".chat-dot")
          .forEach((d, i) =>
            d.classList.toggle("is-active", i === currentIndex),
          );
      }

      labelEl = document.createElement("span");
      labelEl.className = "chat-slide-label";
      const stack = document.getElementById("chatStack");
      if (stack) stack.appendChild(labelEl);

      function updateLabel(animate) {
        if (!labelEl) return;
        const card = cards[currentIndex];
        const text = card.getAttribute("data-slide-label") || "";
        const color = card.getAttribute("data-slide-color") || "#fff";
        if (animate) {
          gsap.to(labelEl, {
            opacity: 0,
            y: -6,
            duration: 0.15,
            ease: "power2.in",
            onComplete: () => {
              labelEl.textContent = text;
              labelEl.style.color = color;
              gsap.fromTo(
                labelEl,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
              );
              labelEl.classList.add("is-visible");
            },
          });
        } else {
          labelEl.textContent = text;
          labelEl.style.color = color;
          labelEl.classList.add("is-visible");
          gsap.set(labelEl, { opacity: 1, y: 0 });
        }
      }

      function layoutStack(animate) {
        cards.forEach((card, i) => {
          const offset = (i - currentIndex + total) % total;
          if (offset < 3) {
            const props = {
              x: 0,
              y: offset * 12,
              scale: 1 - offset * 0.04,
              rotation: offset * 1.2,
              opacity: 1 - offset * 0.22,
              zIndex: total - offset,
              pointerEvents: offset === 0 ? "auto" : "none",
            };
            if (animate && offset < 2) {
              gsap.to(card, {
                ...props,
                duration: offset === 0 ? 0.5 : 0.35,
                ease: offset === 0 ? "elastic.out(1, 0.6)" : "power3.out",
              });
            } else {
              gsap.set(card, props);
            }
          } else {
            gsap.set(card, {
              x: 0,
              y: 0,
              scale: 0.85,
              rotation: 0,
              opacity: 0,
              zIndex: 0,
              pointerEvents: "none",
            });
          }
        });
        updateDots();
        updateLabel(animate);
      }

      layoutStack(false);

      function startIdleFloat() {
        const card = cards[currentIndex];
        if (!card) return;
        idleTween = gsap.to(card, {
          y: "-=4",
          rotation: "-=0.6",
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
      function stopIdleFloat() {
        if (idleTween) {
          idleTween.kill();
          idleTween = null;
        }
      }
      startIdleFloat();

      function onPointerDown(e) {
        if (animating) return;
        isSwiping = true;
        startX = e.clientX;
        dragX = 0;
        lastPX = e.clientX;
        lastTime = performance.now();
        velocityX = 0;
        cards[currentIndex].setPointerCapture(e.pointerId);
        stopIdleFloat();
        if (hint) gsap.to(hint, { opacity: 0, duration: 0.3 });
      }

      function onPointerMove(e) {
        if (!isSwiping) return;
        const card = cards[currentIndex];
        dragX = e.clientX - startX;
        const now = performance.now(),
          dt = now - lastTime;
        if (dt > 0) velocityX = ((e.clientX - lastPX) / dt) * 16;
        lastPX = e.clientX;
        lastTime = now;
        gsap.set(card, {
          x: dragX,
          rotation: dragX * 0.08,
          scale: 1 - Math.min(Math.abs(dragX) / 200, 1) * 0.03,
        });
      }

      function onPointerUp() {
        if (!isSwiping) return;
        isSwiping = false;
        const card = cards[currentIndex];
        const absDrag = Math.abs(dragX),
          absVel = Math.abs(velocityX);
        if (absDrag > 60 || absVel > 4) {
          animating = true;
          const dir = dragX > 0 ? 1 : -1;
          gsap.to(card, {
            x: dir * (800 + absVel * 15),
            rotation: dir * (25 + absVel * 1.5),
            opacity: 0,
            duration: 0.45,
            ease: "power3.in",
            onComplete: () => {
              gsap.set(card, {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 0,
                scale: 0.85,
                pointerEvents: "none",
              });
              currentIndex = (currentIndex + 1) % total;
              layoutStack(true);
              animating = false;
              startIdleFloat();
            },
          });
        } else {
          gsap.to(card, {
            x: 0,
            rotation: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
            onComplete: startIdleFloat,
          });
        }
      }

      cards.forEach((card) => {
        card.addEventListener("pointerdown", onPointerDown);
        card.addEventListener("pointermove", onPointerMove);
        card.addEventListener("pointerup", onPointerUp);
        card.addEventListener("pointercancel", onPointerUp);
      });

      gsap.from("#chatArena", {
        opacity: 0,
        y: 80,
        scale: 0.92,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: "#reviews", start: "top 65%", once: true },
      });
    }

    /* ══════════════════════════════════════════════════════════
       8. MAGNETIC CTA BUTTON
       ══════════════════════════════════════════════════════════ */
    function initMagneticButton() {
      const btn = document.getElementById("ctaButton");
      if (!btn) return;
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - rect.left - rect.width / 2) * 0.35,
          y: (e.clientY - rect.top - rect.height / 2) * 0.35,
          duration: 0.4,
          ease: "power2.out",
        });
      });
      btn.addEventListener("mouseleave", () =>
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)",
        }),
      );
    }

    /* ══════════════════════════════════════════════════════════
       9. TIKTOK VIDEO FEED
       ══════════════════════════════════════════════════════════ */
    function initVideoFeed() {
      const feed = document.querySelector(".video-feed");
      const items = document.querySelectorAll(".video-item");

      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            const video = entry.target.querySelector("video");
            if (!video) return;
            if (entry.isIntersecting && entry.intersectionRatio >= 0.75)
              video.play().catch(() => {});
            else video.pause();
          }),
        { threshold: [0, 0.25, 0.5, 0.75, 1], root: feed },
      );
      items.forEach((item) => observer.observe(item));

      document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document
            .querySelectorAll(".filter-btn")
            .forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const filter = btn.dataset.filter;
          items.forEach((item) => {
            const show = filter === "all" || item.dataset.category === filter;
            item.style.display = show ? "" : "none";
            if (show)
              gsap.from(item, {
                opacity: 0,
                scale: 0.95,
                duration: 0.4,
                ease: "power2.out",
              });
          });
          if (feed) feed.scrollTo({ top: 0, behavior: "smooth" });
        });
      });
    }

    /* ══════════════════════════════════════════════════════════
       10. WHATSAPP CLOUD BUBBLE
       ══════════════════════════════════════════════════════════ */
    function initWaCloud() {
      const cloud = document.getElementById("waCloud");
      if (!cloud) return;
      ScrollTrigger.create({
        trigger: "#about",
        start: "top 65%",
        onEnter: () => cloud.classList.add("is-visible"),
        onLeaveBack: () => cloud.classList.remove("is-visible"),
      });
    }

    // Return cleanup for React useEffect
    return () => {
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  })();
}
