const floatingSymbols = [
  { sym: '\u222b', delay: '0s',   x: '10%', y: '20%' },
  { sym: '\u03c0', delay: '1.5s', x: '85%', y: '15%' },
  { sym: '\u221e', delay: '3s',   x: '20%', y: '75%' },
  { sym: '\u221a', delay: '4.5s', x: '75%', y: '80%' },
  { sym: '\u03a3', delay: '2s',   x: '50%', y: '10%' },
  { sym: '\u0394', delay: '5s',   x: '90%', y: '50%' },
  { sym: '\u03b8', delay: '3.5s', x: '5%',  y: '50%' },
  { sym: '\u2248', delay: '1s',   x: '40%', y: '90%' },
];

export default function FreeTrial() {
  return (
    <section id="free-trial" className="section section--light">
      <div className="cta-container">
        <div className="cta-words">
          <span className="cta-word cta-word--1">YOUR</span>
          <span className="cta-word cta-word--2">FIRST</span>
          <span className="cta-word cta-word--3">LESSON</span>
          <span className="cta-word cta-word--4">IS</span>
          <span className="cta-word cta-word--5">FREE</span>
        </div>
        <div className="cta-bottom">
          <a href="mailto:kavina@tutoring.com" className="cta-button" id="ctaButton">
            <span>Book Your Free Session</span>
          </a>
          <p className="cta-subtext">No commitment. No card. Just math.</p>
        </div>
      </div>

      <div className="floating-symbols" aria-hidden="true">
        {floatingSymbols.map((s, i) => (
          <span
            key={i}
            className="float-sym"
            style={{ '--delay': s.delay, '--x': s.x, '--y': s.y }}
          >
            {s.sym}
          </span>
        ))}
      </div>
    </section>
  );
}
