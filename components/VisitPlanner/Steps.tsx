"use client";

import { Check, X } from "lucide-react";
import { services, type ServiceId } from "@/lib/business";
import { taskById } from "@/lib/tasks";
import {
  frequencyLabels,
  whenLabels,
  photoLabels,
  type PlannerAnswers,
} from "@/lib/summary";

type SetA = <K extends keyof PlannerAnswers>(k: K, v: PlannerAnswers[K]) => void;
type StepProps = { a: PlannerAnswers; set: SetA; errors: Record<string, string> };

const choiceBase =
  "flex min-h-14 w-full items-center gap-3 rounded-[12px] border px-4 py-3 text-left text-[16px] font-semibold transition-colors";
const choiceOn = "border-canopy bg-canopy text-on-green";
const choiceOff = "border-line bg-card text-ink hover:border-canopy/50";

function Tick({ on }: { on: boolean }) {
  return (
    <span
      className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full border ${
        on ? "border-lime bg-lime text-canopy" : "border-line bg-paper"
      }`}
      aria-hidden="true"
    >
      {on && <Check size={15} strokeWidth={3} />}
    </span>
  );
}

function Radio<T extends string>({
  name,
  value,
  options,
  onChange,
  legend,
}: {
  name: string;
  value: T | "";
  options: Record<T, string>;
  onChange: (v: T) => void;
  legend: string;
}) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className="grid gap-2.5">
        {(Object.keys(options) as T[]).map((k) => {
          const on = value === k;
          return (
            <label
              key={k}
              className={`${choiceBase} cursor-pointer has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-canopy ${on ? choiceOn : choiceOff}`}
            >
              <input type="radio" name={name} value={k} checked={on} onChange={() => onChange(k)} className="sr-only" />
              <Tick on={on} />
              {options[k]}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function StepWhat({ a, set, errors }: StepProps) {
  const toggle = (id: ServiceId | "other") => {
    if (a.services.includes(id)) {
      set("services", a.services.filter((s) => s !== id));
      set("tasks", a.tasks.filter((t) => taskById[t]?.service !== id));
    } else set("services", [...a.services, id]);
  };
  const all: { id: ServiceId | "other"; name: string; description: string }[] = [
    ...services,
    { id: "other", name: "Something else", description: "Send a photo and a short description to see whether it is a fit." },
  ];
  return (
    <div>
      <p className="mb-4 text-muted">Pick everything that applies.</p>
      <div className="grid items-start gap-2.5 sm:grid-cols-2">
        {all.map((s) => {
          const on = a.services.includes(s.id);
          const tasks = a.tasks.filter((t) => taskById[t]?.service === s.id);
          return (
            <div key={s.id} className={`rounded-[12px] border ${on ? "border-canopy bg-card" : "border-line bg-card"}`}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s.id)}
                className={`flex min-h-14 w-full items-center gap-3 rounded-[11px] px-4 py-3 text-left text-[16px] font-semibold ${
                  on ? "bg-canopy text-on-green" : "hover:bg-paper"
                }`}
              >
                <Tick on={on} />
                {s.name}
              </button>
              {tasks.length > 0 && (
                <ul className="flex flex-wrap gap-1.5 px-3 py-2.5" aria-label={`Tasks for ${s.name}`}>
                  {tasks.map((t) => (
                    <li key={t}>
                      <button
                        type="button"
                        onClick={() => set("tasks", a.tasks.filter((x) => x !== t))}
                        className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-paper-2 py-1 pl-3 pr-2 text-[14px] font-semibold text-ink hover:bg-line"
                        aria-label={`Remove ${taskById[t].label}`}
                      >
                        {taskById[t].label}
                        <X aria-hidden size={14} strokeWidth={2} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      {errors.services && (
        <p role="alert" className="mt-3 border-l-4 border-canopy pl-3 font-semibold text-ink">
          {errors.services}
        </p>
      )}
    </div>
  );
}

export function StepOften({ a, set }: StepProps) {
  return <Radio name="frequency" legend="How often?" value={a.frequency} options={frequencyLabels} onChange={(v) => set("frequency", v)} />;
}

export function StepWhere({ a, set, errors }: StepProps) {
  const towns = { Potomac: "Potomac", Bethesda: "Bethesda", Rockville: "Rockville", "Silver Spring": "Silver Spring", Other: "Other Montgomery County town" } as const;
  return (
    <div className="grid gap-5">
      <Radio name="town" legend="Town" value={a.town} options={towns} onChange={(v) => set("town", v)} />
      {a.town === "Other" && (
        <label className="block font-semibold">
          Which town?
          <input
            type="text"
            value={a.otherTown}
            onChange={(e) => set("otherTown", e.target.value)}
            className="field mt-1.5"
            autoComplete="address-level2"
            aria-invalid={!!errors.otherTown}
            aria-describedby={errors.otherTown ? "err-othertown" : undefined}
          />
          {errors.otherTown && (
            <span id="err-othertown" role="alert" className="mt-1.5 block border-l-4 border-canopy pl-3 font-semibold text-ink">
              {errors.otherTown}
            </span>
          )}
        </label>
      )}
      <label className="block font-semibold">
        Neighborhood or street name <span className="font-normal text-muted">(optional)</span>
        <input type="text" value={a.street} onChange={(e) => set("street", e.target.value)} className="field mt-1.5" />
      </label>
      {errors.town && (
        <p role="alert" className="border-l-4 border-canopy pl-3 font-semibold text-ink">
          {errors.town}
        </p>
      )}
    </div>
  );
}

export function StepWhen({ a, set }: StepProps) {
  return (
    <div>
      <Radio name="when" legend="When?" value={a.when} options={whenLabels} onChange={(v) => set("when", v)} />
      <p className="mt-4 text-[15px] text-muted">We typically work Monday to Friday, 8 to 4.</p>
    </div>
  );
}

export function StepPhotos({ a, set }: StepProps) {
  return (
    <div>
      <p className="mb-4 text-muted">Photos help us scope the job.</p>
      <Radio name="photos" legend="Photos" value={a.photos} options={photoLabels} onChange={(v) => set("photos", v)} />
    </div>
  );
}

export function StepInfo({ a, set, errors }: StepProps) {
  return (
    <div className="grid gap-4">
      <label className="block font-semibold">
        Name
        <input
          type="text"
          autoComplete="name"
          required
          value={a.name}
          onChange={(e) => set("name", e.target.value)}
          className="field mt-1.5"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "err-name" : undefined}
        />
        {errors.name && (
          <span id="err-name" role="alert" className="mt-1.5 block border-l-4 border-canopy pl-3 font-semibold text-ink">
            {errors.name}
          </span>
        )}
      </label>
      <label className="block font-semibold">
        Phone
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required
          placeholder="301-555-0123"
          value={a.phone}
          onChange={(e) => set("phone", e.target.value)}
          className="field mt-1.5"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "err-phone" : undefined}
        />
        {errors.phone && (
          <span id="err-phone" role="alert" className="mt-1.5 block border-l-4 border-canopy pl-3 font-semibold text-ink">
            {errors.phone}
          </span>
        )}
      </label>
      <label className="block font-semibold">
        Email <span className="font-normal text-muted">(optional)</span>
        <input type="email" autoComplete="email" value={a.email} onChange={(e) => set("email", e.target.value)} className="field mt-1.5" />
      </label>
      <label className="block font-semibold">
        Notes <span className="font-normal text-muted">(optional)</span>
        <textarea rows={3} value={a.notes} onChange={(e) => set("notes", e.target.value)} className="field mt-1.5 !h-auto py-3" />
      </label>
    </div>
  );
}
