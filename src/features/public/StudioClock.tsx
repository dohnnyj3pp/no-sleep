// Static brand motif, deliberately not the visitor's local time.
export function StudioClock() {
  const segments: Record<string, string[]> = {
    "4": ["b", "c", "f", "g"],
    "1": ["b", "c"],
    "2": ["a", "b", "g", "e", "d"],
  };
  const paths: Record<string, string> = {
    a: "4,1 18,1 15,4 7,4",
    b: "19,2 19,14 16,12 16,5",
    c: "19,16 19,28 16,25 16,18",
    d: "4,29 18,29 15,26 7,26",
    e: "3,16 6,18 6,25 3,28",
    f: "3,2 6,5 6,12 3,14",
    g: "4,15 7,13 15,13 18,15 15,17 7,17",
  };
  return (
    <div className="studio-clock" role="img" aria-label="4:12 AM">
      <svg viewBox="0 0 93 32" aria-hidden="true">
        {["4", "1", "2"].map((digit, index) => (
          <g
            key={index}
            transform={`translate(${index * 23 + (index ? 6 : 0)} 0)`}
          >
            {segments[digit].map((segment) => (
              <polygon key={segment} points={paths[segment]} />
            ))}
          </g>
        ))}
        <circle cx="25" cy="10" r="1.8" />
        <circle cx="25" cy="22" r="1.8" />
        <text x="77" y="21">
          AM
        </text>
      </svg>
    </div>
  );
}
