import type { ComponentProps } from "react";
/** Native links preserve canonical URLs, reloads, back/forward and new tabs. */
export function SiteLink({
  href,
  ...props
}: ComponentProps<"a"> & { href: string }) {
  return (
    <a
      href={href}
      aria-current={window.location.pathname === href ? "page" : undefined}
      {...props}
    />
  );
}
