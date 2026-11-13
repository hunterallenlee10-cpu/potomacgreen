import { countyPath, countyViewBox, townPins } from "@/lib/area";

// Montgomery County outline from Census TIGER/Line (see lib/area.ts for the source URL).
export function CountyMap({ className = "" }: { className?: string }) {
  const { width, height } = countyViewBox;
  return (
    <figure className={`on-green rounded-[14px] bg-canopy p-5 text-on-green lg:p-7 ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-labelledby="county-map-title"
      >
        <title id="county-map-title">
          Map of Montgomery County, Maryland with Potomac, Bethesda, Rockville and Silver Spring marked
        </title>
        <path d={countyPath} fill="rgba(245,244,236,0.05)" stroke="#F5F4EC" strokeWidth="2" strokeLinejoin="round" />
        {townPins.map((p) => {
          const { anchor, dx, dy } = p;
          return (
            <g key={p.town}>
              <circle cx={p.x} cy={p.y} r="15" fill="#9FC63A" opacity="0.22" />
              <circle cx={p.x} cy={p.y} r="7" fill="#9FC63A" stroke="#073E2B" strokeWidth="2.5" />
              <text
                x={p.x + dx}
                y={p.y + dy}
                textAnchor={anchor}
                fill="#F5F4EC"
                style={{ font: "700 22px var(--font-hanken), sans-serif" }}
                paintOrder="stroke"
                stroke="#073E2B"
                strokeWidth="6"
              >
                {p.town}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 flex items-center justify-between gap-4 text-[15px] text-on-green-muted">
        <span>Montgomery County, MD</span>
        <span className="flex items-center gap-2">
          <span className="inline-block size-3 rounded-full bg-lime" aria-hidden="true" /> Core towns
        </span>
      </figcaption>
    </figure>
  );
}
