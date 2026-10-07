import { homeAssets } from "../../content/home";
import { StudioClock } from "./StudioClock";

/** Preserve the approved studio panel independently of the outer page video. */
export function HeroMedia() {
  return (
    <div className="hero-media">
      <div className="studio-scene">
        <img src={homeAssets.studio} alt="" fetchPriority="high" />
        <StudioClock />
      </div>
    </div>
  );
}
