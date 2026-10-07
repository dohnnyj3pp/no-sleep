import { catalogueNotice } from "../../content/notices";
import { Brand } from "../../components/Brand";
import { Icon } from "../../components/Icon";
import { type NoticeHandler } from "../../components/NoticeDialog";
import { HeroMedia } from "./HeroMedia";
import { QuickNavigation } from "./QuickNavigation";
export function HomePage({ onNotice }: { onNotice: NoticeHandler }) {
  return (
    <main id="main" tabIndex={-1} className="home-page">
      <section className="studio-hero" aria-labelledby="hero-heading">
        <HeroMedia />
        <div className="scene-shade" />
        <div className="hero-content">
          <Brand hero />
          <p className="hero-tagline">
            BEATS <span>•</span> VISUALS <span>•</span> VIBES
          </p>
          <div className="hero-copy">
            <h1 id="hero-heading">
              PREMIUM BEATS
              <br />
              FOR VISIONARIES.
            </h1>
            <p>
              High quality instrumentals for artists
              <br className="desktop-break" /> who create without limits.
            </p>
            <div className="hero-actions">
              <button
                className="button button--browse"
                onClick={() => onNotice(catalogueNotice)}
              >
                <span>BROWSE BEATS</span> <Icon name="arrow" />
              </button>
              <button
                className="button"
                onClick={() =>
                  onNotice({
                    title: "Sound without limits.",
                    body: "From hard-hitting trap to atmospheric R&B, No Sleep is built for artists with a vision. The full catalogue is coming soon.",
                  })
                }
              >
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
        <QuickNavigation />
      </section>
    </main>
  );
}
