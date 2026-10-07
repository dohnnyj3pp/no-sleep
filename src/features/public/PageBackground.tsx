import { useState, useSyncExternalStore } from "react";
import { homeAssets } from "../../content/home";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function PageBackground() {
  // Conditional mounting prevents video downloads and autoplay for reduced motion,
  // including when the OS preference changes while the page is open.
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => true,
  );
  return (
    <>
      <div className="page-background" aria-hidden="true">
        <img
          className="page-background-poster"
          src={homeAssets.poster}
          alt=""
          width="1920"
          height="1080"
          fetchPriority="high"
        />
        {!reducedMotion && <BackgroundVideo />}
        <div className="page-background-overlay" />
        <div className="page-background-vignette" />
      </div>
    </>
  );
}

function BackgroundVideo() {
  const [playing, setPlaying] = useState(false);
  // Native autoplay does the work. Keep the poster visible until playback begins,
  // or if playback is blocked or fails. No timers or scripted play() calls.
  return (
    <video
      className={`page-background-video${playing ? " page-background-video--playing" : ""}`}
      poster={homeAssets.poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      onError={() => setPlaying(false)}
    >
      <source src={homeAssets.videoWebm} type="video/webm" />
      <source src={homeAssets.videoMp4} type="video/mp4" />
    </video>
  );
}
