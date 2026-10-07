import { useState } from "react";
import { Brand } from "../../components/Brand";
import { Icon } from "../../components/Icon";
import { SiteLink } from "../../components/SiteLink";
import { siteNavigation } from "../../content/navigation";
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="home-brand" href="/" aria-label="No Sleep home">
        <Brand />
      </a>
      <button
        className="icon-button menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen(!open)}
      >
        <Icon name={open ? "close" : "menu"} />
      </button>
      <nav
        id="primary-navigation"
        aria-label="Main navigation"
        className={open ? "navigation is-open" : "navigation"}
      >
        {siteNavigation
          .filter((item) => item.href !== "/login")
          .map((item) => (
            <SiteLink
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </SiteLink>
          ))}
      </nav>
      <span className="header-note">INDEPENDENT SOUND. AFTER HOURS.</span>
      {siteNavigation
        .filter((item) => item.href === "/login")
        .map((item) => (
          <SiteLink
            key={item.href}
            href={item.href}
            className="button login-button"
            aria-label="Producer login"
          >
            <Icon name="user" />
            <span>{item.label}</span>
          </SiteLink>
        ))}
    </header>
  );
}
