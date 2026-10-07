import { homeAssets } from "../../content/home";
import { siteNavigation } from "../../content/navigation";
import { SiteLink } from "../../components/SiteLink";
export function QuickNavigation() {
  return (
    <nav className="quick-section" aria-label="Quick navigation">
      <div className="quick-grid">
        {siteNavigation.map((item, index) => (
          <SiteLink key={item.href} href={item.href} className="quick-card">
            <span
              className="quick-art"
              aria-hidden="true"
              style={{
                backgroundImage: `url(${homeAssets.quickNavigation})`,
                backgroundPosition: `${index * 25}% center`,
              }}
            />
            <span className="quick-name">{item.label}</span>
          </SiteLink>
        ))}
      </div>
    </nav>
  );
}
