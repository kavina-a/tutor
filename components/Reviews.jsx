const conversations = [
  {
    label: "the gratitude",
    color: "#4ecdc4",
    initial: "S",
    tag: "EDEXCEL IGCSE (9-1) · 2025",
    bubbles: [
      {
        side: "them",
        text: "You've helped me improve so much over the past few months and I want to say thank you so much for all the support ❤️",
      },
      {
        side: "them",
        text: "Mr Kavina is a brilliant teacher. His flexibility in tailoring lessons to suit my needs is commendable.",
      },
      {
        side: "me",
        text: "Thank you so much for your kind words! It's truly been a pleasure teaching you and I'm amazed by how much you've grown since we started 😊",
      },
    ],
  },
  {
    label: "the results",
    color: "#ff6b6b",
    initial: "A",
    tag: "EDEXCEL IGCSE (9-1) Foundation · 2025",
    bubbles: [
      { side: "them", text: "Hey! I got my results back and wow..." },
      {
        side: "them",
        text: "137/150 = 91%!! 😱 I didn't even expect that much!",
      },
      {
        side: "them",
        text: "All thanks to you. You helped me genuinely understand concepts and gave me self belief after my last attempt",
      },
      {
        side: "me",
        text: "This is amazing! 137/150 is outstanding work. You completely earned this 🎉",
      },
    ],
  },
  {
    label: "the breakthrough",
    color: "#dda0dd",
    initial: "K",
    tag: "EDEXCEL IGCSE (9-1) · 2023",
    bubbles: [
      {
        side: "them",
        text: "I approached you at a time when I had very little passion for maths",
      },
      {
        side: "them",
        text: "With just 3 months before IGCSE exams, you helped me understand concepts and work through past papers",
      },
      {
        side: "them",
        text: "Just got my results... B grade! Thank you so much",
      },
      {
        side: "me",
        text: "From struggling to a B grade in 3 months? That's the dedication! I'm genuinely proud of you 💪",
      },
    ],
  },
  {
    label: "the excellence",
    color: "#a8e6cf",
    initial: "R",
    tag: "EDEXCEL IAL · 2024",
    bubbles: [
      { side: "them", text: "Just got my IAL results back..." },
      {
        side: "them",
        text: "A in Pure Mathematics, A in Statistics & Mechanics! 🎊",
      },
      {
        side: "them",
        text: "Your systematic approach to each unit made the workload feel so manageable",
      },
      {
        side: "me",
        text: "Straight A's across the board! Your hard work really paid off. Congratulations! 🏆",
      },
    ],
  },
  {
    label: "the transformation",
    color: "#ffe66d",
    initial: "L",
    tag: "EDEXCEL IAL · 2025",
    bubbles: [
      { side: "them", text: "I'm going to UCL for Engineering!" },
      {
        side: "them",
        text: "Just realized it's partly because of the A* you helped me get in IAL maths",
      },
      {
        side: "them",
        text: "You didn't just teach me maths, you made me believe I could do it",
      },
      {
        side: "me",
        text: "UCL Engineering?! That's incredible! Your potential was always there, you just needed to see it 🚀",
      },
    ],
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="section section--black">
      <div className="reviews-header">
        <span className="section-label section-label--light">
          STUDENT REVIEWS
        </span>
        <h2 className="reviews-title">
          Real conversations.
          <br />
          <em>Real results.</em>
        </h2>
      </div>

      <div className="chat-arena" id="chatArena" data-lenis-prevent>
        <div className="chat-stack" id="chatStack">
          {conversations.map((convo) => (
            <div
              key={convo.label}
              className="chat-card"
              data-slide-color={convo.color}
            >
              <div className="chat-card__header">
                <div className="chat-card__profile">
                  <div className="chat-card__avatar">{convo.initial}</div>
                  <div className="chat-card__meta">
                    <strong>Student</strong>
                    <span className="chat-card__online">&bull; online</span>
                  </div>
                </div>
                <span className="chat-card__menu">&bull;&bull;&bull;</span>
              </div>

              <div className="chat-card__body">
                {convo.bubbles.map((b, i) => (
                  <div key={i} className={`chat-bubble chat-bubble--${b.side}`}>
                    <p>{b.text}</p>
                  </div>
                ))}
              </div>

              <div className="chat-card__tag">{convo.tag}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-indicator">
        <div className="chat-dots" id="chatDots" />
        <div className="swipe-prompt" id="chatHint">
          <span className="swipe-arrow swipe-arrow--left">&#8592;</span>
          <span className="swipe-prompt__text">swipe to read more</span>
          <span className="swipe-arrow swipe-arrow--right">&#8594;</span>
        </div>
      </div>
    </section>
  );
}
