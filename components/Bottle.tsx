import { EMBLEM } from "@/lib/logo-paths";

type Props = {
  liquid: string;
  name: string;
  className?: string;
  /** Show three small vials instead of a single bottle (for sets). */
  set?: boolean;
};

/**
 * Placeholder bottle illustration, drawn in SVG and tinted per product.
 * Swap for real photography by adding `images` to a product in lib/products.ts.
 */
export function Bottle({ liquid, name, className, set }: Props) {
  const id = name.replace(/[^a-z0-9]/gi, "");
  if (set) {
    return (
      <svg className={className} viewBox="0 0 240 300" aria-hidden="true">
        <defs>
          <linearGradient id={`l-${id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={liquid} stopOpacity=".55" />
            <stop offset="1" stopColor={liquid} />
          </linearGradient>
        </defs>
        <ellipse cx="120" cy="286" rx="96" ry="7" fill="#3d2616" opacity=".12" />
        {[40, 120, 200].map((x, i) => (
          <g key={x} transform={`translate(${x - 28} ${i === 1 ? 40 : 66})`}>
            <rect x="16" y="0" width="24" height="34" rx="3" fill="#3d2616" />
            <rect x="4" y="34" width="48" height={i === 1 ? 210 : 184} rx="10" fill="#fff" opacity=".55" stroke="#3d2616" strokeOpacity=".18" />
            <rect x="9" y="58" width="38" height={i === 1 ? 180 : 154} rx="7" fill={`url(#l-${id})`} />
            <rect x="12" y="42" width="5" height={i === 1 ? 180 : 150} rx="2.5" fill="#fff" opacity=".45" />
          </g>
        ))}
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 200 300" aria-hidden="true">
      <defs>
        <linearGradient id={`cap-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#6b5442" />
          <stop offset=".45" stopColor="#3d2616" />
          <stop offset="1" stopColor="#25170d" />
        </linearGradient>
        <linearGradient id={`liq-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={liquid} stopOpacity=".55" />
          <stop offset="1" stopColor={liquid} />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="288" rx="78" ry="7" fill="#3d2616" opacity=".14" />
      <rect x="66" y="14" width="68" height="62" rx="5" fill={`url(#cap-${id})`} />
      <rect x="86" y="76" width="28" height="14" fill="#cbbba5" />
      <rect x="24" y="90" width="152" height="194" rx="20" fill="#fff" opacity=".5" stroke="#3d2616" strokeOpacity=".16" />
      <rect x="32" y="122" width="136" height="154" rx="14" fill={`url(#liq-${id})`} />
      <rect x="38" y="100" width="9" height="170" rx="4.5" fill="#fff" opacity=".5" />
      <rect x="62" y="168" width="76" height="70" fill="#f8f5f0" opacity=".92" />
      <svg x="91" y="176" width="18" height="38" viewBox={EMBLEM.viewBox}>
        {EMBLEM.paths.map((d, i) => (
          <path key={i} d={d} fill="#3d2616" />
        ))}
      </svg>
      <rect x="76" y="222" width="48" height="1.5" fill="#3d2616" opacity=".5" />
      <rect x="84" y="228" width="32" height="1.5" fill="#3d2616" opacity=".3" />
    </svg>
  );
}
