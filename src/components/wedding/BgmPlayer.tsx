import { useCallback, useEffect, useRef, useState } from "react";
import { Music, Pause, VolumeX } from "lucide-react";
import { bgm } from "@/lib/wedding";

// Browsers block audible autoplay, but muted autoplay is allowed.
// So the player mounts immediately (muted), then unmutes on the
// first user gesture — e.g. the "Tap to open" tap.
export function BgmPlayer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const unlocked = useRef(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const command = useCallback((func: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*",
    );
  }, []);

  const unlockSound = useCallback(() => {
    if (unlocked.current) return;
    unlocked.current = true;
    // Send twice: the player may not be ready for the first one.
    command("unMute");
    window.setTimeout(() => command("unMute"), 1200);
    setMuted(false);
  }, [command]);

  useEffect(() => {
    window.addEventListener("wedding:opened", unlockSound);
    window.addEventListener("pointerdown", unlockSound);
    window.addEventListener("keydown", unlockSound);
    return () => {
      window.removeEventListener("wedding:opened", unlockSound);
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
    };
  }, [unlockSound]);

  function toggle() {
    if (playing) {
      command("pauseVideo");
      setPlaying(false);
    } else {
      unlockSound();
      command("playVideo");
      setPlaying(true);
    }
  }

  return (
    <>
      <iframe
        ref={iframeRef}
        title="Wedding background music"
        src={`https://www.youtube.com/embed/${bgm.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${bgm.youtubeId}&rel=0&enablejsapi=1`}
        allow="autoplay; encrypted-media"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        aria-hidden="true"
        tabIndex={-1}
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing && !muted}
        aria-label={
          !playing
            ? "Play background music"
            : muted
              ? "Unmute background music"
              : "Pause background music"
        }
        className="press fixed bottom-5 right-5 z-[90] grid h-12 w-12 place-items-center rounded-full border border-primary/40 bg-background/85 text-primary shadow-[0_14px_30px_-18px_rgba(112,82,42,0.75)] backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {!playing || muted ? (
          <span className="relative grid place-items-center">
            <Music className="h-5 w-5" />
            <VolumeX className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-primary p-[1px] text-primary-foreground" />
          </span>
        ) : (
          <span className="relative grid place-items-center">
            <Music className="h-5 w-5 animate-[float-soft_3s_ease-in-out_infinite]" />
            <Pause className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-primary p-[1px] text-primary-foreground" />
          </span>
        )}
      </button>
    </>
  );
}
