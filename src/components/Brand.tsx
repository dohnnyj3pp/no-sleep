// One canonical, unmodified artist-supplied PNG for every graphical brand mark.
export function Brand({ hero = false }: { hero?: boolean }) {
  return (
    <span className={`brand${hero ? " brand--hero" : ""}`}>
      <img
        src="/images/no-sleep-logo.png"
        alt="No Sleep"
        width="1774"
        height="887"
      />
    </span>
  );
}
