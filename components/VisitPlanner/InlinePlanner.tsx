"use client";

import { VisitPlanner } from "./VisitPlanner";

// The same planner, embedded in the page (used on /contact).
export function InlinePlanner() {
  return <VisitPlanner inline titleId="planner-inline-title" />;
}
