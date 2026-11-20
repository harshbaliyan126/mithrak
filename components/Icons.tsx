// Small glyphs used in buttons. Lore-style: tiny, solid, monochrome.
type P = { className?: string };
const s = (p: P) => ({ width: 10, height: 10, viewBox: "0 0 10 10", "aria-hidden": true, ...p });

export const PrevIcon = (p: P) => (
  <svg {...s(p)} fill="currentColor"><rect x="1" y="1" width="1.4" height="8" /><path d="M9 1v8L3 5z" /></svg>
);
export const NextIcon = (p: P) => (
  <svg {...s(p)} fill="currentColor"><rect x="7.6" y="1" width="1.4" height="8" /><path d="M1 1v8l6-4z" /></svg>
);
export const PauseIcon = (p: P) => (
  <svg {...s(p)} fill="currentColor"><rect x="2" y="1" width="1.4" height="8" /><rect x="6.6" y="1" width="1.4" height="8" /></svg>
);
export const PlayIcon = (p: P) => (
  <svg {...s(p)} fill="currentColor"><path d="M2 1v8l7-4z" /></svg>
);
export const MuteIcon = (p: P) => (
  <svg {...s(p)} fill="currentColor"><path d="M0 3.5h2L5 1v8L2 6.5H0z" /><path d="m6.5 3.5 3 3m0-3-3 3" stroke="currentColor" strokeWidth="1" /></svg>
);
export const SoundIcon = (p: P) => (
  <svg {...s(p)} fill="currentColor"><path d="M0 3.5h2L5 1v8L2 6.5H0z" /><path d="M6.5 3a2.5 2.5 0 0 1 0 4M8 1.5a4.5 4.5 0 0 1 0 7" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
);
export const CloseIcon = (p: P) => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" {...p}><path d="M1 1l10 10M11 1 1 11" stroke="currentColor" strokeWidth="1.1" /></svg>
);
export const ChevronLeft = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" {...p}><path d="M9 2 4 7l5 5" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
);
export const ChevronRight = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" {...p}><path d="m5 2 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
);
export const ChevronDown = (p: P) => (
  <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true" {...p}><path d="m1 3 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
);
