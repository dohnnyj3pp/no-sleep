import { catalogueNotice } from "./notices";
import type { Notice } from "../components/NoticeDialog";
export const siteNavigation: readonly {
  label: string;
  href: string;
  notice?: Notice;
}[] = [
  { label: "HOME", href: "/" },
  { label: "BEATS", href: "/beats", notice: catalogueNotice },
  {
    label: "BIO",
    href: "/bio",
    notice: {
      title: "For the ones still creating.",
      body: "No Sleep is a home for premium instrumentals, late-night ideas, and artists who create without limits. Beats. Visuals. Vibes.",
    },
  },
  {
    label: "CONTACT",
    href: "/contact",
    notice: {
      title: "Let’s make something after hours.",
      body: "Custom beat requests are coming soon. The contact channel will be available here when the studio opens for inquiries.",
    },
  },
  {
    label: "LOGIN",
    href: "/login",
    notice: {
      title: "Producer access. Coming soon.",
      body: "The private producer workspace is not open yet. Uploads and beat management will arrive in a later release.",
    },
  },
];
