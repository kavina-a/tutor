export default function Hero() {
  const cards = [
    {
      rotation: "-15",
      x: "-220",
      color: "#ff6b6b",
      img: "card-algebra.png",
      alt: "Algebra",
    },
    {
      rotation: "-7",
      x: "-110",
      color: "#4ecdc4",
      img: "card-calculus.png",
      alt: "Calculus",
    },
    {
      rotation: "0",
      x: "0",
      color: "#ffe66d",
      img: "card-geometry.png",
      alt: "Geometry",
    },
    {
      rotation: "7",
      x: "110",
      color: "#a8e6cf",
      img: "card-statistics.png",
      alt: "Statistics",
    },
    {
      rotation: "15",
      x: "220",
      color: "#dda0dd",
      img: "card-trig.png",
      alt: "Trig",
    },
  ];

  const marqueeText =
    "EDEXCEL IGCSE \u00b7 CAMBRIDGE IGCSE \u00b7 GCSE 9\u20131 MATHS \u00b7 EDEXCEL A-LEVEL MATHS \u00b7 PURE MATHEMATICS \u00b7 IAL MATHEMATICS \u00b7 EXAM PREPARATION \u00b7 ALGEBRA \u00b7 TRIGONOMETRY \u00b7 CALCULUS \u00b7 STATISTICS \u00b7 PROBLEM SOLVING \u00b7 ";

  return (
    <section id="hero" className="section section--light">
      {/* Top bar */}
      <div className="hero-top">
        <span className="hero-top__location">0760796819</span>
        <span className="hero-top__email">kmanthuka@gmail.com</span>

      </div>

      {/* Heading */}
      <h1 className="hero-name" aria-label="Math. Done Properly.">
        <span className="char">Math.</span>
        <span className="char"> Done Properly.</span>
      </h1>

      {/* Card stack */}
      <div className="card-stack" id="cardStack">
        {cards.map((c) => (
          <div
            key={c.alt}
            className="topic-card"
            data-base-rotation={c.rotation}
            data-base-x={c.x}
            style={{ "--card-color": c.color }}
          >
            <img
              src={`/assets/images/${c.img}`}
              alt={c.alt}
              className="topic-card__img"
              draggable="false"
            />
          </div>
        ))}
      </div>

      {/* Tagline */}
      <h2 className="hero-tagline">
        <span>MATH TUTOR,</span>
        <span>MENTOR &amp; PROBLEM SOLVER</span>
      </h2>

      {/* Marquee */}
      <div className="marquee">
        <div className="marquee-track">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-arrow">&darr;</div>
      </div>
    </section>
  );
}
