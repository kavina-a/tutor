const conversations = [
  {
    label: "the gratitude",
    color: "#4ecdc4",
    initial: "S",
    tag: "IGCSE Maths",
    bubbles: [
      {
        side: "them",
        text: "You've helped me improve so much over the past few months and I want to say thank you so much for all the support \u2764\uFE0F",
      },
      {
        side: "them",
        text: "Would definitely recommend you to any student looking for a tutor",
      },
      {
        side: "me",
        text: "Thank you so much for your kind words! It's truly been a pleasure teaching you and I'm amazed by how much you've grown since we started \uD83D\uDE0A",
      },
    ],
  },
  {
    label: "the results",
    color: "#ff6b6b",
    initial: "J",
    tag: "A-Level Maths \u00b7 A*",
    bubbles: [
      { side: "them", text: "AHHHHH I GOT MY RESULTS" },
      {
        side: "them",
        text: "A* IN MATHS!!!! \uD83D\uDE2D\uD83D\uDE2D\uD83D\uDE2D",
      },
      {
        side: "me",
        text: "YES!! I knew you could do it! So proud of you \uD83C\uDF89",
      },
      { side: "them", text: "my parents are literally crying happy tears rn" },
    ],
  },
  {
    label: "the breakthrough",
    color: "#dda0dd",
    initial: "P",
    tag: "A-Level Further Maths \u00b7 Imperial",
    bubbles: [
      { side: "them", text: "ok so i actually understood integration today" },
      {
        side: "them",
        text: "like ACTUALLY understood it, not just memorised the steps",
      },
      {
        side: "me",
        text: "That's the goal! Once it clicks, it never un-clicks \uD83D\uDE0A",
      },
      { side: "them", text: "you're the best \uD83D\uDE4F" },
    ],
  },
  {
    label: "the comeback",
    color: "#a8e6cf",
    initial: "M",
    tag: "IGCSE Maths \u00b7 Grade 9",
    bubbles: [
      { side: "them", text: "I used to cry before every math test" },
      {
        side: "them",
        text: "just got a 9 in my mocks \uD83D\uDE2D\uD83C\uDF89",
      },
      { side: "them", text: "my teacher couldn't believe it was me" },
      {
        side: "me",
        text: "I'm not surprised at all! You put in the work and it paid off. So proud of you \uD83D\uDCAA",
      },
    ],
  },
  {
    label: "the jump",
    color: "#ffe66d",
    initial: "A",
    tag: "SAT Math \u00b7 620 \u2192 790",
    bubbles: [
      { side: "them", text: "SAT scores just came back..." },
      { side: "them", text: "790 MATH \uD83E\uDD2F" },
      { side: "them", text: "i started at 620 btw" },
      {
        side: "me",
        text: "170 point jump! That's incredible work. You earned every single point \uD83D\uDCAA",
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
