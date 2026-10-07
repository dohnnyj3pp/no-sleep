import { useState } from "react";
import { Header } from "./features/public/Header";
import { HomePage } from "./features/public/HomePage";
import { NoticeDialog, type Notice } from "./components/NoticeDialog";
import { PageBackground } from "./features/public/PageBackground";
import { siteNavigation } from "./content/navigation";
const copyrightYear = new Date().getFullYear();
export default function App() {
  const [notice, setNotice] = useState<Notice | null>(
    () =>
      siteNavigation.find((item) => item.href === window.location.pathname)
        ?.notice ?? null,
  );
  return (
    <>
      <PageBackground />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <HomePage onNotice={setNotice} />
      <footer className="site-footer">
        <span>© {copyrightYear} NO SLEEP</span>
        <span>MASTERED BEATS.</span>
        <span>AFTER HOURS. PREMIUM VIBES.</span>
      </footer>
      <NoticeDialog
        notice={notice}
        onClose={() => {
          if (window.location.pathname !== "/")
            window.history.replaceState(null, "", "/");
          setNotice(null);
        }}
      />
    </>
  );
}
