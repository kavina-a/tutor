const videos = [
  { cat: 'algebra',  grad1: '#ff6b6b', grad2: '#ee5a24', sym: '0! = 1',    title: 'Why 0! = 1',                 tags: '#algebra #factorial #mathfacts', likes: '2.4k', comments: '186'  },
  { cat: 'calculus', grad1: '#4ecdc4', grad2: '#2c3e50', sym: 'dy/dx',     title: 'Derivatives in 60 Seconds',  tags: '#calculus #derivatives #quickmath', likes: '1.8k', comments: '94'   },
  { cat: 'fun',      grad1: '#a8e6cf', grad2: '#1a535c', sym: '\u03c0 = ?', title: 'The Beauty of Pi',           tags: '#pi #mathbeauty #funfacts',     likes: '5.1k', comments: '312'  },
  { cat: 'exam',     grad1: '#ffe66d', grad2: '#f39c12', sym: 'A*',        title: 'IB Math HL: Top 3 Exam Hacks', tags: '#IB #examtips #mathHL',        likes: '3.2k', comments: '207'  },
  { cat: 'fun',      grad1: '#dda0dd', grad2: '#6c3483', sym: 'e\u2071\u03c0+1=0', title: 'The Most Beautiful Equation', tags: '#euler #beauty #mindblown', likes: '8.7k', comments: '542'  },
  { cat: 'algebra',  grad1: '#f4a261', grad2: '#e76f51', sym: 'a\u00b2+b\u00b2=c\u00b2', title: 'Pythagoras But Make It Intuitive', tags: '#geometry #pythagoras #proofs', likes: '4.3k', comments: '289'  },
];

export default function TikTokFeed() {
  return (
    <section id="tiktok" className="section section--black">
      <div className="feed-intro">
        <span className="section-label section-label--light">WATCH ME TEACH</span>
        <h2 className="feed-title">Short Lessons</h2>
        <div className="feed-filters">
          <button className="filter-btn active" data-filter="all">All</button>
          <button className="filter-btn" data-filter="algebra">Algebra</button>
          <button className="filter-btn" data-filter="calculus">Calculus</button>
          <button className="filter-btn" data-filter="fun">Fun Facts</button>
          <button className="filter-btn" data-filter="exam">Exam Tips</button>
        </div>
      </div>

      <div className="video-feed" data-lenis-prevent>
        {videos.map((v, i) => (
          <div key={i} className="video-item" data-category={v.cat}>
            <div
              className="video-placeholder"
              style={{ '--grad-1': v.grad1, '--grad-2': v.grad2 }}
            >
              <span className="video-placeholder__symbol">{v.sym}</span>
              <span className="video-placeholder__hint">&#9654; Video coming soon</span>
            </div>
            <div className="video-overlay">
              <div className="video-overlay__left">
                <strong className="video-handle">@kavina.math</strong>
                <p className="video-title">{v.title}</p>
                <span className="video-tag">{v.tags}</span>
              </div>
              <div className="video-overlay__right">
                <button className="video-action">&hearts;<span>{v.likes}</span></button>
                <button className="video-action">&#128172;<span>{v.comments}</span></button>
                <button className="video-action">&#8599;<span>Share</span></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
