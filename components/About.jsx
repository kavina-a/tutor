const chapters = [
  {
    n: "01",
    icon: "∑",
    title: "Grade 8 & Above (Edexcel / Cambridge)",
    color: "#ff6b6b",
    desc: "Build strong math foundations early. Clear explanations that make harder topics easier later.",
  },
  {
    n: "02",
    icon: "∫",
    title: "Edexcel IGCSE Mathematics",
    color: "#4ecdc4",
    desc: "Master the Edexcel 9–1 syllabus. Concept clarity, exam strategies, and past paper practice.",
  },
  {
    n: "03",
    icon: "△",
    title: "Cambridge IGCSE Mathematics",
    color: "#ffe66d",
    desc: "Understand the Cambridge approach. Learn the logic behind questions and common exam patterns.",
  },
  {
    n: "04",
    icon: "θ",
    title: "Edexcel IAL Mathematics",
    color: "#dda0dd",
    desc: "Advanced math, explained step-by-step. Pure math topics broken down for clarity and confidence.",
  },
  {
    n: "05",
    icon: "∞",
    title: "Online Classes",
    color: "#f4a261",
    desc: "Learn from anywhere. Interactive lessons designed to keep students engaged and focused.",
  },
  {
    n: "06",
    icon: "★",
    title: "Group Classes",
    color: "#e76f51",
    desc: "Learn together. Grow faster. Collaborative sessions where students solve and discuss problems.",
  },
  {
    n: "07",
    icon: "🧩",
    title: "Past Paper Revision",
    color: "#90be6d",
    desc: "Practice the questions that matter most. Focused past paper sessions with clear step-by-step solutions.",
  },
];

const stats = [
  { target: "200", suffix: "+", label: "Students Taught" },
  { target: "98", suffix: "%", label: "Pass Rate" },
  { target: "4.9", suffix: "\u2605", label: "Average Rating" },
  { target: "500", suffix: "+", label: "Hours Tutored" },
];

export default function About() {
  return (
    <section id="about" className="section section--dark">
      {/* ── Psychological hook ── */}
      <div className="about-hook">
        <span className="section-label">ABOUT</span>

        <p className="about-hook__lead">
          Most students don&rsquo;t struggle with math because they&rsquo;re{" "}
          <em className="about-em">&ldquo;bad at it&rdquo;</em>.
        </p>

        <p className="about-hook__text">
          They struggle because somewhere along the way,{" "}
          <span className="about-mark">
            the explanation didn&rsquo;t click.
          </span>
        </p>

        <ul className="about-hook__reasons">
          <li>Maybe the class moved too fast.</li>
          <li>Maybe the teacher skipped steps.</li>
          <li>
            Maybe it was memorising formulas without understanding why they
            work.
          </li>
        </ul>

        <p className="about-hook__text">
          I&rsquo;ve seen it happen hundreds of times.
        </p>

        <p className="about-hook__text">
          And almost every time, the moment a concept is explained properly, you
          can literally see it happen &mdash; that moment where the student
          pauses and says:
        </p>

        <blockquote className="about-hook__quote">
          &ldquo;Oh&hellip; now I get it.&rdquo;
        </blockquote>

        <p className="about-hook__close">
          That&rsquo;s the moment I teach for.
        </p>
      </div>

      {/* ── Personal intro with photos ── */}
      <div className="about-intro">
        <div className="about-intro__content">
          <p className="about-intro__greeting">
            Hi, I&rsquo;m <strong>Kavina.</strong>
          </p>
          <p className="about-intro__text">
            I&rsquo;m a math tutor working with students preparing for{" "}
            <span className="about-mark">Edexcel IGCSE and IAL</span> exams. My
            focus is simple: helping students understand{" "}
            <span className="about-mark">the logic behind the math</span> so
            they can solve problems with confidence.
          </p>
          <p className="about-intro__text">
            Over the years I&rsquo;ve worked with{" "}
            <strong className="about-stat-inline">200+ students</strong>,
            helping them improve their understanding, exam performance, and
            confidence with the subject.
          </p>
          <p className="about-intro__close">
            Because when math is explained properly, it stops feeling{" "}
            <em className="about-em">impossible.</em>
          </p>
        </div>

        <div className="about-photo-collage">
          <img
            src="/assets/images/kavina-1.jpg"
            alt="Kavina teaching"
            className="collage-photo"
            draggable="false"
          />
          <img
            src="/assets/images/kavina-2.jpg"
            alt=""
            className="collage-photo"
            draggable="false"
          />
          <img
            src="/assets/images/kavina-3.png"
            alt=""
            className="collage-photo"
            draggable="false"
          />
        </div>
      </div>

      {/* ── Chapter carousel ── */}
      <div className="chapters-section">
        <div className="chapters-header">
          <span className="section-label">WHAT I TEACH</span>
          <h3 className="chapters-title">Explore the chapters</h3>
        </div>
        <div className="chapters-wrapper">
          <div className="chapters-track">
            {chapters.map((c) => (
              <div
                key={c.n}
                className="chapter-card"
                style={{ "--accent": c.color }}
              >
                <span className="chapter-card__number">{c.n}</span>
                <div className="chapter-card__icon">{c.icon}</div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="stats-section">
        {stats.map((s) => (
          <div key={s.label} className="stat" data-target={s.target}>
            <span className="stat__number">0</span>
            <span className="stat__suffix">{s.suffix}</span>
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
