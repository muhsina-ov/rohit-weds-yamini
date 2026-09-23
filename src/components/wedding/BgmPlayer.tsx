import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { bgm } from "@/lib/wedding";

export function BgmPlayer() {
  const [playing, setPlaying] = useState(false);
  const startedByOpener = useRef(false);

  useEffect(() => {
    function onOpened() {
      // The opener tap is a user gesture, so starting audio here
      // is allowed by mobile autoplay policies.
      if (!startedByOpener.current) {
        startedByOpener.current = true;
        setPlaying(true);
      }
    }
    window.addEventListener("wedding:opened", onOpened);
    return () => window.removeEventListener("wedding:opened", onOpened);
  }, []);

  return (
    <>
      {playing && (
        <iframe
          title="Wedding background music"
          src={`https://www.youtube.com/embed/${bgm.youtubeId}?autoplay=1&loop=1&playlist=${bgm.youtubeId}&rel=0`}
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-pressed={playing}
        aria-label={playing ? "Pause background music" : "Play background music"}
        className="press fixed bottom-5 right-5 z-[90] grid h-12 w-12 place-items-center rounded-full border border-primary/40 bg-background/85 text-primary shadow-[0_14px_30px_-18px_rgba(112,82,42,0.75)] backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {playing ? (
          <span className="relative grid place-items-center">
            <Music className="h-5 w-5 animate-[float-soft_3s_ease-in-out_infinite]" />
            <Pause className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-primary p-[1px] text-primary-foreground" />
          </span>
        ) : (
          <Music className="h-5 w-5" />
        )}
      </button>
    </>
  );
}
