
import { useEffect, useMemo, useRef, useState } from "react";
import "./beatVault.css";

type Beat = {
  id: string;
  title: string;
  genre: string;
  mood: string;
  bpm: number;
  key: string;
  seconds: number;
  preview: string | null;
};

const beats: Beat[] = [
  { id:"midnight", title:"MIDNIGHT DRIVE", genre:"TRAP", mood:"DARK", bpm:142, key:"F# MINOR", seconds:168, preview:null },
  { id:"afterhours", title:"AFTER HOURS", genre:"R&B", mood:"MELODIC", bpm:78, key:"G MINOR", seconds:192, preview:null },
  { id:"sleepless", title:"SLEEPLESS", genre:"TRAP", mood:"AGGRESSIVE", bpm:148, key:"D MINOR", seconds:156, preview:null },
  { id:"redline", title:"REDLINE", genre:"DRILL", mood:"AGGRESSIVE", bpm:140, key:"C MINOR", seconds:181, preview:null },
  { id:"lowlight", title:"LOWLIGHT", genre:"LOFI", mood:"ATMOSPHERIC", bpm:92, key:"A MINOR", seconds:174, preview:null }
];

const licenses = [
  "MP3 LEASE",
  "WAV LEASE",
  "TRACKOUTS",
  "EXCLUSIVE"
];

function formatTime(seconds: number) {
  return Math.floor(seconds / 60) + ":" +
    String(Math.floor(seconds % 60)).padStart(2, "0");
}

export function BeatVault({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const audio = useRef<HTMLAudioElement>(null);

  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("ALL");
  const [mood, setMood] = useState("ALL");
  const [sort, setSort] = useState("FEATURED");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedId, setSelectedId] = useState(beats[0].id);
  const [license, setLicense] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);

  const selected = beats.find(b => b.id === selectedId) ?? beats[0];

  const results = useMemo(() => {
    const filtered = beats.filter(b =>
      (genre === "ALL" || b.genre === genre) &&
      (mood === "ALL" || b.mood === mood) &&
      (!favoritesOnly || favorites.includes(b.id)) &&
      [b.title, b.genre, b.mood, b.bpm, b.key]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );

    if (sort === "BPM LOW") filtered.sort((a,b) => a.bpm-b.bpm);
    if (sort === "BPM HIGH") filtered.sort((a,b) => b.bpm-a.bpm);
    if (sort === "TITLE") filtered.sort((a,b) => a.title.localeCompare(b.title));

    return filtered;
  }, [query, genre, mood, sort, favorites, favoritesOnly]);

  useEffect(() => {
    const element = dialog.current;
    if (open && element && !element.open) element.showModal();
    if (!open && element?.open) element.close();
  }, [open]);

  function selectBeat(id: string) {
    audio.current?.pause();
    setSelectedId(id);
    setPlaying(false);
    setPosition(0);
  }

  function favorite(id: string) {
    setFavorites(old =>
      old.includes(id) ? old.filter(v => v !== id) : [...old, id]
    );
  }

  function play() {
    const element = audio.current;
    if (!element || !selected.preview) return;

    if (element.paused) {
      void element.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      element.pause();
      setPlaying(false);
    }
  }

  return (
    <dialog
      ref={dialog}
      className="vault-modal"
      aria-labelledby="vault-title"
      onCancel={e => {
        e.preventDefault();
        onClose();
      }}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="vault-app">
        <header className="vault-top">
          <div>
            <p>NO SLEEP / MUSIC LIBRARY</p>
            <h2 id="vault-title">
              THE BEAT VAULT <span>4:12 AM</span>
            </h2>
          </div>
          <button
            className="vault-x"
            onClick={onClose}
            aria-label="Close Beat Vault"
          >
            ✕
          </button>
        </header>

        <div className="vault-middle">
          <aside className="vault-filters">
            <h3>FIND YOUR SOUND.</h3>

            <label>
              SEARCH
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Title, BPM, key..."
              />
            </label>

            <label>
              GENRE
              <select value={genre} onChange={e => setGenre(e.target.value)}>
                {["ALL","TRAP","R&B","DRILL","LOFI"].map(v =>
                  <option key={v}>{v}</option>
                )}
              </select>
            </label>

            <label>
              MOOD
              <select value={mood} onChange={e => setMood(e.target.value)}>
                {["ALL","DARK","MELODIC","AGGRESSIVE","ATMOSPHERIC"].map(v =>
                  <option key={v}>{v}</option>
                )}
              </select>
            </label>

            <label className="vault-check">
              <input
                type="checkbox"
                checked={favoritesOnly}
                onChange={e => setFavoritesOnly(e.target.checked)}
              />
              FAVORITES ONLY
            </label>

            <p>PRODUCED FOR THE RESTLESS.</p>
          </aside>

          <section className="vault-main" aria-label="Beat catalogue">
            <div className="vault-heading">
              <div>
                <small>DISCOVER / INSTRUMENTALS</small>
                <h3>ALL BEATS ({results.length})</h3>
              </div>

              <label>
                SORT
                <select value={sort} onChange={e => setSort(e.target.value)}>
                  {["FEATURED","TITLE","BPM LOW","BPM HIGH"].map(v =>
                    <option key={v}>{v}</option>
                  )}
                </select>
              </label>
            </div>

            <div className="vault-list">
              {results.map((beat, i) => (
                <div
                  key={beat.id}
                  className={
                    "vault-row" +
                    (selectedId === beat.id ? " is-selected" : "")
                  }
                >
                  <button
                    className="vault-track"
                    onClick={() => selectBeat(beat.id)}
                    aria-pressed={selectedId === beat.id}
                  >
                    <span className="vault-art">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <strong>{beat.title}</strong>
                      <small>
                        {beat.genre} · {beat.mood} · {beat.bpm} BPM · {beat.key}
                      </small>
                    </span>
                    <span>{formatTime(beat.seconds)}</span>
                  </button>

                  <button
                    className="vault-heart"
                    onClick={() => favorite(beat.id)}
                    aria-label={
                      favorites.includes(beat.id)
                        ? "Remove favorite"
                        : "Add favorite"
                    }
                    aria-pressed={favorites.includes(beat.id)}
                  >
                    {favorites.includes(beat.id) ? "♥" : "♡"}
                  </button>
                </div>
              ))}

              {results.length === 0 && (
                <p className="vault-no-results">
                  No matching beats. Try another filter.
                </p>
              )}
            </div>

            <div className="vault-details">
              <div>
                <small>SELECTED TRACK</small>
                <h3>{selected.title}</h3>
                <p>
                  {selected.genre} · {selected.mood} · {selected.bpm} BPM · {selected.key}
                </p>
                <p>
                  Audio previews and release details will appear when
                  Steve uploads his music.
                </p>
              </div>

              <div>
                <small>LICENSE OPTIONS / DEMO</small>
                <div className="vault-licenses">
                  {licenses.map((name, i) => (
                    <button
                      key={name}
                      className={license === i ? "chosen" : ""}
                      onClick={() => setLicense(i)}
                      aria-pressed={license === i}
                    >
                      {name}
                    </button>
                  ))}
                </div>
                <p>
                  Demonstration only. No purchases or licenses are offered yet.
                </p>
                <button className="vault-buy" disabled>
                  REQUEST COMING SOON ↗
                </button>
              </div>
            </div>
          </section>
        </div>

        <footer className="vault-player">
          <strong>♫ &nbsp; {selected.title}</strong>
          <button
            onClick={play}
            disabled={!selected.preview}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? "❚❚" : "▶"}
          </button>
          <span>{formatTime(position)}</span>
          <input
            type="range"
            min={0}
            max={selected.seconds}
            value={position}
            disabled={!selected.preview}
            aria-label="Seek"
            onChange={e => {
              const pos = Number(e.target.value);
              setPosition(pos);
              if (audio.current) audio.current.currentTime = pos;
            }}
          />
          <span>{formatTime(selected.seconds)}</span>
          <small>
            {selected.preview ? "PREVIEW" : "PREVIEWS COMING SOON"}
          </small>
        </footer>

        <audio
          ref={audio}
          src={selected.preview ?? undefined}
          preload="none"
          onTimeUpdate={e => setPosition(e.currentTarget.currentTime)}
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
        />
      </div>
    </dialog>
  );
}
