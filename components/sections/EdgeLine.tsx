"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

// "The Edge Line": a lime stroke that draws along the grass to mulch edge in photo 01,
// as if a spade just cut it. Points were traced by eye on the 2600 x 1733 source.
const POINTS: [number, number][] = [
  [335, 1052],
  [450, 1070],
  [580, 1097],
  [700, 1135],
  [800, 1166],
  [900, 1200],
  [1000, 1230],
  [1100, 1260],
  [1200, 1288],
  [1300, 1306],
  [1372, 1311],
];

// Catmull-Rom to cubic Bezier, so the cut reads as one smooth curve.
function smoothPath(pts: [number, number][]) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}
const D = smoothPath(POINTS);

function useDraw(
  pathRef: React.RefObject<SVGPathElement | null>,
  dotRef: React.RefObject<SVGCircleElement | null>,
  delay: number,
  shadowRef?: React.RefObject<SVGPathElement | null>,
) {
  const reduce = useReducedMotion();
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const paths = [path, shadowRef?.current].filter(Boolean) as SVGPathElement[];
    paths.forEach((p) => (p.style.strokeDasharray = `${len}`));
    if (reduce) {
      paths.forEach((p) => (p.style.strokeDashoffset = "0"));
      return;
    }
    paths.forEach((p) => (p.style.strokeDashoffset = `${len}`));
    const dot = dotRef.current;
    const controls = animate(0, 1, {
      duration: 1.1,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (p) => {
        paths.forEach((el) => (el.style.strokeDashoffset = `${len * (1 - p)}`));
        if (dot) {
          const pt = path.getPointAtLength(len * p);
          dot.setAttribute("cx", `${pt.x}`);
          dot.setAttribute("cy", `${pt.y}`);
          dot.style.opacity = p < 0.02 ? `${p * 50}` : p > 0.86 ? `${Math.max(0, (1 - p) / 0.14)}` : "1";
        }
      },
    });
    return () => controls.stop();
  }, [pathRef, dotRef, shadowRef, reduce, delay]);
}

// Desktop: sits inside the hero photo frame, so it scales exactly with the photo.
export function EdgeLinePhoto() {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const shadowRef = useRef<SVGPathElement>(null);
  useDraw(pathRef, dotRef, 0.35, shadowRef);

  // Keep the stroke at 2.5 CSS px whatever the photo scale.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const ro = new ResizeObserver(([entry]) => {
      const unit = 2600 / Math.max(1, entry.contentRect.width);
      svg.style.setProperty("--u", `${unit}`);
    });
    ro.observe(svg);
    return () => ro.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 2600 1733"
      preserveAspectRatio="xMidYMid slice"
      className="edge-photo pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
      style={{ ["--u" as string]: "1.8" }}
    >
      {/* Thin dark keyline under the lime so the cut reads against bright grass. */}
      <path
        ref={shadowRef}
        d={D}
        fill="none"
        stroke="#073E2B"
        strokeOpacity="0.55"
        strokeLinecap="round"
        style={{ strokeWidth: "calc(6 * var(--u))", strokeDashoffset: 99999, strokeDasharray: 99999 }}
      />
      <path
        ref={pathRef}
        d={D}
        fill="none"
        stroke="#9FC63A"
        strokeLinecap="round"
        style={{ strokeWidth: "calc(2.5 * var(--u))", strokeDashoffset: 99999, strokeDasharray: 99999 }}
      />
      <circle ref={dotRef} r="1" cx={POINTS[0][0]} cy={POINTS[0][1]} fill="#9FC63A" style={{ opacity: 0, r: "calc(5 * var(--u))" } as React.CSSProperties} />
    </svg>
  );
}

// Phone fallback: the same stroke, hand-cut under "More gets done."
export function EdgeLineUnderline() {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  useDraw(pathRef, dotRef, 0.3);
  return (
    <svg
      viewBox="0 0 300 14"
      preserveAspectRatio="none"
      className="edge-under pointer-events-none absolute -bottom-[0.16em] left-0 h-[0.2em] w-[96%] overflow-visible"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M2,9 C40,5.5 80,4.2 122,5.4 C168,6.8 214,9.8 258,8.2 C276,7.6 288,6.4 298,5"
        fill="none"
        stroke="#9FC63A"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ strokeDashoffset: 99999, strokeDasharray: 99999 }}
      />
      <circle ref={dotRef} r="3" cx="2" cy="9" fill="#9FC63A" style={{ opacity: 0 }} />
    </svg>
  );
}
