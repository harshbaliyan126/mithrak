import { EMBLEM, WORDMARK } from "@/lib/logo-paths";

type Props = { className?: string; title?: string };

/** MITHRAK wordmark only. Colour follows `currentColor`. */
export function Wordmark({ className, title = "Mithrak" }: Props) {
  return (
    <svg className={className} viewBox={WORDMARK.viewBox} role="img" aria-label={title} fill="currentColor">
      {WORDMARK.paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/** Ring-and-star emblem only. Colour follows `currentColor`. */
export function Emblem({ className, title = "Mithrak" }: Props) {
  return (
    <svg className={className} viewBox={EMBLEM.viewBox} role="img" aria-label={title} fill="currentColor">
      {EMBLEM.paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/** Full stacked lock-up (emblem over wordmark). */
export function FullLogo({ className, title = "Mithrak" }: Props) {
  return (
    <svg className={className} viewBox="0 0 910.41 446.95" role="img" aria-label={title} fill="currentColor">
      {[...EMBLEM.paths, ...WORDMARK.paths].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
