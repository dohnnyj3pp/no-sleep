import { useEffect, useState } from "react";
import { Header } from "./features/public/Header";
import { HomePage } from "./features/public/HomePage";
import { NoticeDialog, type Notice } from "./components/NoticeDialog";
import { PageBackground } from "./features/public/PageBackground";
import { siteNavigation } from "./content/navigation";
import { catalogueNotice } from "./content/notices";
import { BeatVault } from "./features/vault/BeatVault";
const copyrightYear = new Date().getFullYear();
export default function App() {
  const [notice, setNotice] = useState<Notice | null>(
    () =>
      siteNavigation.find((item) => item.href === window.location.pathname)
        ?.notice ?? null,
  );

  const [vaultOpen, setVaultOpen] = useState(
    () => location.pathname === "/beats"
  );

  useEffect(() => {
    function follow(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey ||
        !(event.target instanceof Element)
      ) return;

      const link = event.target.closest("a[href]");
      if (!link || link.getAttribute("target") === "_blank" ||
          link.hasAttribute("download")) return;

      const url = new URL(link.getAttribute("href") || "", location.href);
      if (url.origin !== location.origin || url.pathname !== "/beats") return;

      event.preventDefault();
      if (location.pathname !== "/beats")
        history.pushState(null, "", "/beats");

      setNotice(null);
      setVaultOpen(true);
    }

    function back() {
      setNotice(null);
      setVaultOpen(location.pathname === "/beats");
    }

    document.addEventListener("click", follow);
    window.addEventListener("popstate", back);

    return () => {
      document.removeEventListener("click", follow);
      window.removeEventListener("popstate", back);
    };
  }, []);

  function openVault() {
    if (location.pathname !== "/beats")
      history.pushState(null, "", "/beats");
    setNotice(null);
    setVaultOpen(true);
  }

  function closeVault() {
    setVaultOpen(false);
    setNotice(null);
    if (location.pathname === "/beats")
      history.replaceState(null, "", "/");
  }
  return (
    <>
      <PageBackground />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <HomePage onNotice={(next) => next.title === catalogueNotice.title ? openVault() : setNotice(next)} />
      <footer className="site-footer">
        <span>© {copyrightYear} NO SLEEP</span>
        <span>MASTERED BEATS.</span>
        <span>AFTER HOURS. PREMIUM VIBES.</span>
      </footer>
      <BeatVault open={vaultOpen} onClose={closeVault} />
      <NoticeDialog
        notice={vaultOpen ? null : notice}
        onClose={() => {
          if (window.location.pathname !== "/")
            window.history.replaceState(null, "", "/");
          setNotice(null);
        }}
      />
    </>
  );
}
