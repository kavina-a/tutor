export default function Loader() {
  return (
    <div className="loader" id="loader">
      <video
        className="loader-video"
        id="loaderVideo"
        src="/assets/videos/loader-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="loader-center" id="loaderCenter">
        <span className="loader-word" id="loaderWord" />
      </div>
    </div>
  );
}
