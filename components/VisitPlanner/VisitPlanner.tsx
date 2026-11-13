"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Wordmark } from "@/components/ui/Logo";
import { emptyAnswers, isValidUSPhone, type PlannerAnswers } from "@/lib/summary";
import { taskById } from "@/lib/tasks";
import type { PlannerPreset } from "./PlannerContext";
import { StepWhat, StepOften, StepWhere, StepWhen, StepPhotos, StepInfo } from "./Steps";
import { Success } from "./Success";

const steps = [
  { title: "What needs doing?", Body: StepWhat },
  { title: "How often?", Body: StepOften },
  { title: "Where?", Body: StepWhere },
  { title: "When?", Body: StepWhen },
  { title: "Photos", Body: StepPhotos },
  { title: "Your info", Body: StepInfo },
];

function fromPreset(p: PlannerPreset): PlannerAnswers {
  const tasks = (p.tasks ?? []).filter((t) => taskById[t]?.status === "handled");
  const fromTasks = tasks.map((t) => taskById[t].service!);
  const services = [...new Set([...(p.services ?? []), ...fromTasks])];
  return {
    ...emptyAnswers,
    services,
    tasks,
    town: p.town ?? "",
    otherTown: p.otherTown ?? "",
    notes: p.notes ?? "",
  };
}

export function VisitPlanner({
  preset = {},
  presetKey = 0,
  onClose,
  inline = false,
  titleId,
}: {
  preset?: PlannerPreset;
  presetKey?: number;
  onClose?: () => void;
  inline?: boolean;
  titleId: string;
}) {
  const [a, setA] = useState<PlannerAnswers>(() => fromPreset(preset));
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<"next" | "back">("next");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // A new pre-select (another button) starts a fresh plan.
  useEffect(() => {
    setA(fromPreset(preset));
    setStep(0);
    setErrors({});
    setDone(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetKey]);

  // Move focus to the step heading so screen readers hear the new step.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    bodyRef.current?.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [step, done]);

  const set = <K extends keyof PlannerAnswers>(k: K, v: PlannerAnswers[K]) => {
    setA((cur) => ({ ...cur, [k]: v }));
    setErrors((e) => {
      if (!e[k as string]) return e;
      const next = { ...e };
      delete next[k as string];
      return next;
    });
  };

  const validate = (i: number) => {
    const e: Record<string, string> = {};
    if (i === 0 && a.services.length === 0) e.services = "Pick at least one, or choose Something else.";
    if (i === 2 && !a.town) e.town = "Pick your town so we know where the job is.";
    if (i === 2 && a.town === "Other" && !a.otherTown.trim()) e.otherTown = "Type the town name.";
    if (i === 5) {
      if (!a.name.trim()) e.name = "Please add your name.";
      if (!isValidUSPhone(a.phone)) e.phone = "Please enter a 10 digit phone number so we can reply.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = (ev?: FormEvent) => {
    ev?.preventDefault();
    if (!validate(step)) {
      // focus the first invalid field
      requestAnimationFrame(() => bodyRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], [role="alert"]')?.focus?.());
      return;
    }
    if (step === steps.length - 1) {
      setDone(true);
      return;
    }
    setDir("next");
    setStep((s) => s + 1);
  };
  const back = () => {
    setDir("back");
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  const { title, Body } = steps[step];
  const progress = done ? 100 : ((step + 1) / steps.length) * 100;

  return (
    <div className={`flex flex-col overflow-hidden bg-paper ${inline ? "ticket" : "h-full"}`}>
      <div className="on-green shrink-0 bg-canopy text-on-green">
        <div className="flex items-center gap-3 px-5 pt-4 sm:px-7">
          <Wordmark size="sm" />
          <p className="ml-auto whitespace-nowrap text-[14px] font-bold text-on-green-muted" aria-live="polite">
            {done ? "Ready" : `Step ${step + 1} of ${steps.length}`}
          </p>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-full hover:bg-white/10"
              aria-label="Close the Visit Planner"
            >
              <X aria-hidden size={24} strokeWidth={1.75} />
            </button>
          )}
        </div>
        <h2 id={titleId} className="sr-only">
          Visit Planner
        </h2>
        <div className="mt-4 h-1.5 bg-white/10" aria-hidden="true">
          <div className="h-full bg-lime transition-[width] duration-200" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {done ? (
        <div ref={bodyRef} className="flex-1 overflow-y-auto overscroll-contain px-5 py-7 sm:px-7">
          <Success a={a} headingRef={headingRef} onEdit={() => setDone(false)} />
        </div>
      ) : (
        <form onSubmit={next} noValidate className="flex min-h-0 flex-1 flex-col">
          <div ref={bodyRef} className="flex-1 overflow-y-auto overscroll-contain px-5 py-7 sm:px-7">
            <div key={step} className={dir === "next" ? "step-next" : "step-back"}>
              <h3 ref={headingRef} tabIndex={-1} className="text-[30px] font-semibold leading-tight outline-none sm:text-[34px]">
                {title}
              </h3>
              <div className="mt-5">
                <Body a={a} set={set} errors={errors} />
              </div>
            </div>
          </div>
          <div className="relative shrink-0 border-t border-line bg-card px-5 pb-6 pt-4 sm:px-7">
            <div className="flex items-center gap-3">
              {step > 0 ? (
                <button type="button" onClick={back} className="btn btn-outline !min-h-12">
                  <ArrowLeft aria-hidden size={18} strokeWidth={1.75} /> Back
                </button>
              ) : (
                <span />
              )}
              <button type="submit" className="btn btn-primary ml-auto !min-h-12">
                {step === steps.length - 1 ? "Review and send" : "Next"}
                <ArrowRight aria-hidden size={18} strokeWidth={1.75} />
              </button>
            </div>
            <div className="hatch absolute inset-x-0 bottom-0" aria-hidden="true" />
          </div>
        </form>
      )}
    </div>
  );
}
