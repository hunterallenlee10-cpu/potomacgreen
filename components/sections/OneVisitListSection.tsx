import { OneVisitList } from "@/components/OneVisitList/OneVisitList";
import { Photo } from "@/components/ui/Photo";

// Block 3: the show-stopper.
export function OneVisitListSection() {
  return (
    <section id="one-visit-list" aria-labelledby="ovl-title" className="section bg-paper">
      <div className="wrap">
        <div className="max-w-[720px]">
          <p className="eyebrow">Build your list</p>
          <h2 id="ovl-title" className="h2 mt-4">
            Put your whole list in one visit.
          </h2>
          <p className="mt-5 max-w-[48ch] text-[18px] text-muted">
            Tap everything on your list. We will tell you straight what we handle.
          </p>
        </div>
        <div className="mt-12 lg:mt-16">
          <OneVisitList
            hedgeImage={
              <div className="relative hidden aspect-[1560/1733] w-full overflow-hidden rounded-[14px] lg:block">
                <Photo name="hedge" sizes="(min-width: 1024px) 40vw, 1px" />
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
