import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { buildRsvpWhatsappHref, couple, rsvp, venue } from "@/lib/wedding";
import { useParallax } from "@/hooks/use-reveal";
import footerWash from "@/assets/footer-wash.jpg";
const floral = "https://media.invitestory.in/seashell-vows/src/assets/floral-spray.png";
const lantern = "https://media.invitestory.in/seashell-vows/src/assets/watercolor-lantern.png";
const lanterns = "https://media.invitestory.in/seashell-vows/src/assets/lantern-constellation.png";

export function WeddingFooter() {
  const drift = useParallax(0.18);
  const [shareStatus, setShareStatus] = useState("Share this invitation");
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [guests, setGuests] = useState(2);
  const [formError, setFormError] = useState("");

  async function copyInvitation() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("Invitation link copied");
    } catch {
      setShareStatus("Copy the link from your browser");
    }
  }

  function submitRsvp() {
    if (!name.trim()) {
      setFormError("Please tell us your name.");
      return;
    }
    if (!attending) {
      setFormError("Please choose Yes or No.");
      return;
    }
    setFormError("");
    const href = buildRsvpWhatsappHref({
      name,
      attending,
      guests: attending === "yes" ? guests : 0,
    });
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <footer className="footer-scene relative isolate min-h-[38rem] overflow-hidden">
      <img
        src={footerWash}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1280}
        className="absolute inset-0 -z-30 h-full w-full object-cover"
        style={{ transform: `translate3d(0, ${-drift * 0.32}px, 0) scale(1.12)` }}
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,var(--color-background)_0%,transparent_24%,color-mix(in_oklab,var(--color-background)_38%,transparent)_100%)]" />
      <img
        src={lanterns}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1536}
        className="pointer-events-none absolute -right-24 -top-32 -z-10 h-[110%] w-auto opacity-40"
      />
      <img
        src={lantern}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1536}
        className="lantern-breathe pointer-events-none absolute -left-10 top-24 -z-10 w-28 opacity-70"
      />

      <div className="mx-auto flex min-h-[38rem] max-w-lg flex-col items-center justify-end px-7 pb-10 pt-32 text-center">
        <img
          src={floral}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1024}
          height={1024}
          className="w-24 opacity-75"
        />
        <p className="mt-4 script text-lg text-primary">We cannot wait to celebrate with you</p>
        <h2 className="mt-4 font-display text-[2.65rem] leading-[1.05]">
          {couple.bride} <span className="script text-2xl text-primary">&</span> {couple.groom}
        </h2>

        <div className="mt-7 grid w-full max-w-sm grid-cols-2 border-y border-primary/25 py-4 text-left">
          <div className="border-r border-primary/25 pr-5">
            <p className="text-xs text-muted-foreground">The wedding</p>
            <p className="mt-1 font-display text-lg">29 January 2027 · 7 PM</p>
          </div>
          <div className="pl-5">
            <p className="text-xs text-muted-foreground">The place</p>
            <p className="mt-1 font-display text-lg">{venue.name}</p>
          </div>
        </div>

        <div className="card-soft mt-7 w-full max-w-sm p-5 text-center">
          <p className="script text-lg text-primary">RSVP</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Kindly let us know by 15 January 2027
          </p>

          <label
            htmlFor="rsvp-name"
            className="mt-4 block text-left text-[0.62rem] uppercase tracking-airy text-muted-foreground"
          >
            Your name
          </label>
          <input
            id="rsvp-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Sharma"
            autoComplete="name"
            className="mt-2 min-h-[48px] w-full rounded-sm border border-primary/30 bg-background/80 px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />

          <p className="mt-4 text-left text-[0.62rem] uppercase tracking-airy text-muted-foreground">
            Will you attend?
          </p>
          <div className="mt-2 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Will you attend?">
            <button
              type="button"
              role="radio"
              aria-checked={attending === "yes"}
              onClick={() => setAttending("yes")}
              className={`press flex min-h-[48px] items-center justify-center rounded-sm border px-4 text-[0.66rem] uppercase tracking-[0.2em] ${
                attending === "yes"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-primary/45 bg-background/70 text-foreground"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={attending === "no"}
              onClick={() => setAttending("no")}
              className={`press flex min-h-[48px] items-center justify-center rounded-sm border px-4 text-[0.66rem] uppercase tracking-[0.2em] ${
                attending === "no"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-primary/45 bg-background/70 text-foreground"
              }`}
            >
              No
            </button>
          </div>

          {attending === "yes" && (
            <div className="mt-4 rounded-sm border border-primary/25 bg-background/60 p-3">
              <p className="text-[0.62rem] uppercase tracking-airy text-muted-foreground">
                Guests (including you)
              </p>
              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  disabled={guests <= 1}
                  aria-label="One guest fewer"
                  className="press grid h-11 w-11 place-items-center rounded-full border border-primary/40 text-primary disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <p className="font-display text-2xl" aria-live="polite">
                  {guests} {guests === 1 ? "guest" : "guests"}
                </p>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(10, g + 1))}
                  disabled={guests >= 10}
                  aria-label="One guest more"
                  className="press grid h-11 w-11 place-items-center rounded-full border border-primary/40 text-primary disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {formError && (
            <p role="alert" className="mt-3 text-xs text-destructive">
              {formError}
            </p>
          )}

          <button
            type="button"
            onClick={submitRsvp}
            className="press mt-4 flex min-h-[52px] w-full items-center justify-center rounded-sm bg-primary px-4 text-[0.66rem] uppercase tracking-[0.2em] text-primary-foreground"
          >
            Send RSVP on WhatsApp
          </button>
          <p className="mt-2 text-xs text-muted-foreground">
            This opens WhatsApp with your reply addressed to {rsvp.phoneDisplay}.
          </p>

          <div className="mt-4 border-t border-primary/20 pt-4">
            <p className="text-xs text-muted-foreground">Prefer to talk?</p>
            <a
              href={rsvp.phoneHref}
              className="mt-1 block font-display text-2xl text-foreground"
            >
              {rsvp.phoneDisplay}
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={copyInvitation}
          className="press mt-7 min-h-[48px] rounded-sm border border-primary/45 bg-background/70 px-6 text-[0.66rem] uppercase tracking-[0.2em] text-foreground backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Copy invitation link
        </button>
        <p aria-live="polite" className="mt-3 min-h-5 text-xs text-muted-foreground">
          {shareStatus}
        </p>

        <p className="mt-8 text-xs leading-relaxed text-foreground/70">
          With love, from our families to yours
        </p>

        <a
          href="https://www.instagram.com/invitestory.in/"
          target="_blank"
          rel="noreferrer"
          className="mt-6 text-[0.55rem] uppercase tracking-[0.18em] text-foreground/40 transition-colors hover:text-primary/70"
        >
          Follow @invitestory.in on Instagram
        </a>
      </div>
    </footer>
  );
}
