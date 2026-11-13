// Block 9. TODO: replace with real reviews once the Google Business Profile exists.
// These are samples and are labelled as samples. No stars, no real-looking names.
const samples = [
  {
    text: "Sent three photos of an overgrown front bed on WhatsApp. The hedges got shaped and fresh mulch went down in the same visit.",
    who: "Sample homeowner, Bethesda",
    job: "Mulch and hedges",
  },
  {
    text: "The new patio set sat in boxes for a month. It was assembled and placed where we wanted it in one afternoon.",
    who: "Sample homeowner, Potomac",
    job: "Furniture assembly",
  },
  {
    text: "We needed four heavy planters moved to the other side of the house before a party. Quick text, clear plan, done.",
    who: "Sample homeowner, Rockville",
    job: "Moving help",
  },
];

export function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="section bg-paper-2">
      <div className="wrap">
        <div className="max-w-[720px]">
          <p className="eyebrow">Reviews</p>
          <h2 id="reviews-title" className="h2 mt-4">
            What a visit should feel like.
          </h2>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-6">
          {samples.map((r, i) => (
            <li key={r.who} className={`ticket flex flex-col p-6 lg:p-7 ${i === 1 ? "md:translate-y-6" : ""}`}>
              <p className="ticket-label rounded-[6px] bg-paper-2 px-2.5 py-1.5 !text-ink">
                Sample review: replace with real Google reviews
              </p>
              <blockquote className="font-display mt-5 text-[21px] font-medium leading-[1.4]">{r.text}</blockquote>
              <p className="mt-auto pt-6 text-[15px] text-muted">
                <span className="font-bold text-ink">{r.who}</span> · {r.job}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-14 text-[17px] text-muted">Worked with Potomac Green? Reviews help neighbors find us.</p>
      </div>
    </section>
  );
}
