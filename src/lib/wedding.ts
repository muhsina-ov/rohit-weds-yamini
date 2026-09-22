export const couple = {
  bride: "Yamini Luckwal",
  groom: "Rohit Saha",
  tagline: "Two souls, one celebration",
  dateLabel: "Friday, 29 January 2027",
  weddingISO: "2027-01-29T19:00:00+05:30",
};

export type WeddingEvent = {
  name: string;
  glyph: string;
  date: string;
  time: string;
  venue: string;
  note: string;
};

export const events: WeddingEvent[] = [
  {
    name: "Wedding",
    glyph: "☀",
    date: "29 Jan 2027",
    time: "7:00 PM onwards",
    venue: "Golden Gate Banquet Hall",
    note: "Join us as we exchange vows and begin our forever.",
  },
];

export const venue = {
  name: "Golden Gate Banquet Hall",
  address: "Golden Gate Banquet Hall",
  mapsUrl: "https://maps.app.goo.gl/mqsmvJ17V2NXeda78?g_st=iw",
};

export const rsvp = {
  phoneDisplay: "+91 81780 17215",
  phoneHref: "tel:+918178017215",
  whatsappHref: "https://wa.me/918178017215?text=Hi!%20I%20would%20love%20to%20RSVP%20for%20Rohit%20%26%20Yamini's%20wedding%20on%2029%20Jan%202027.",
};

function icsStamp(d: Date) {
  return `${d.toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`;
}

export function buildICS() {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Rohit & Yamini//Wedding//EN"];
  const starts: Record<string, string> = {
    Wedding: "2027-01-29T19:00:00+05:30",
  };
  for (const ev of events) {
    const start = new Date(starts[ev.name] ?? couple.weddingISO);
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
    lines.push(
      "BEGIN:VEVENT",
      `UID:${ev.name.toLowerCase()}-rohit-yamini@wedding`,
      `DTSTAMP:${icsStamp(new Date())}`,
      `DTSTART:${icsStamp(start)}`,
      `DTEND:${icsStamp(end)}`,
      `SUMMARY:${ev.name} | ${couple.groom} & ${couple.bride}`,
      `LOCATION:${ev.venue}`,
      `DESCRIPTION:${ev.note}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadICS() {
  const blob = new Blob([buildICS()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rohit-yamini-wedding.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
