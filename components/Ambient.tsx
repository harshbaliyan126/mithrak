/**
 * Full-bleed background media. Plays `video` when provided; otherwise renders a
 * slowly drifting colour field built from the product gradient, as a stand-in
 * until campaign footage is ready.
 */
export function Ambient({
  video,
  colors,
  paused,
  muted = true,
  zoom,
  className = "",
}: {
  video?: string;
  colors: [string, string];
  paused?: boolean;
  muted?: boolean;
  /** Scale the video up to crop black bars baked into the footage. */
  zoom?: number;
  className?: string;
}) {
  if (video) {
    return (
      <video
        className={`ambient ${className}`}
        src={video}
        style={zoom ? { transform: `scale(${zoom})` } : undefined}
        muted
        loop
        playsInline
        preload="metadata"
        ref={(v) => {
          if (!v) return;
          v.muted = muted;
          if (paused) v.pause();
          else v.play().catch(() => {});
        }}
      />
    );
  }
  return (
    <div
      className={`ambient ambient-field ${paused ? "is-paused" : ""} ${className}`}
      style={{ "--a": colors[0], "--b": colors[1] } as React.CSSProperties}
      aria-hidden="true"
    >
      <span />
      <span />
      <span />
    </div>
  );
}
