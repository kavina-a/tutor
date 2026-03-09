export default function DotNav() {
  return (
    <nav className="dot-nav" aria-label="Section navigation">
      <a href="#hero" className="dot active" data-section="hero">
        <span>Home</span>
      </a>
      <a href="#about" className="dot" data-section="about">
        <span>About</span>
      </a>
      <a href="#reviews" className="dot" data-section="reviews">
        <span>Reviews</span>
      </a>
      <a href="#free-trial" className="dot" data-section="free-trial">
        <span>Free Trial</span>
      </a>
      <a href="#tiktok" className="dot" data-section="tiktok">
        <span>Videos</span>
      </a>
    </nav>
  );
}
