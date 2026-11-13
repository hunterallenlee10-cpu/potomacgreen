const steps = [
  {
    title: "Describe the job",
    body: "Call, text or WhatsApp with the location, your task list and preferred timing.",
  },
  {
    title: "Send photos",
    body: "Photos show the size and condition of the yard, furniture, planter or work area.",
  },
  {
    title: "Confirm and schedule",
    body: "We agree on the scope, estimate and timing before the work begins.",
  },
];

// Block 7: horizontal numbered strip.
export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section scroll-mt-16 bg-paper-2">
      <div className="wrap">
        <div className="max-w-[760px]">
          <p className="eyebrow">How it works</p>
          <h2 id="how-title" className="h2 mt-4">
            From task list to scheduled work in three steps.
          </h2>
        </div>
        <ol className="mt-12 grid border-t border-ink/15 md:grid-cols-3 lg:mt-16">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="border-b border-ink/15 py-8 md:border-b-0 md:py-10 md:pr-10 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-10"
            >
              <span className="font-display relative inline-block text-[84px] font-semibold leading-[0.9] text-canopy lg:text-[104px]">
                {i + 1}
                <span className="absolute -bottom-2 left-0 h-[5px] w-full rounded-full bg-lime" aria-hidden="true" />
              </span>
              <h3 className="mt-7 text-[26px] font-semibold leading-tight">{s.title}</h3>
              <p className="mt-2 max-w-[34ch] text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
