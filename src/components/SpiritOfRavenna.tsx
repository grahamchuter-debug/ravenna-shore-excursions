import { spiritOfRavenna } from "@/data/homepage";
import { subjectImages } from "@/lib/images";
import { ResponsiveImage } from "@/components/ResponsiveImage";

export function SpiritOfRavenna() {
  const image = subjectImages[spiritOfRavenna.imageKey] ?? subjectImages["san-vitale"];

  return (
    <section className="section-padding bg-gradient-to-b from-coastal-50 via-white to-white border-b border-coastal-100">
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-eyebrow">{spiritOfRavenna.eyebrow}</p>
            <h2 className="section-title mt-2 max-w-xl">{spiritOfRavenna.title}</h2>
            {spiritOfRavenna.paragraphs.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? "mt-6 text-base leading-relaxed text-gray-700" : "mt-4 text-base leading-relaxed text-gray-600"}
              >
                {p}
              </p>
            ))}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {spiritOfRavenna.highlights.map((item) => (
                <div key={item.label} className="card-feature text-center">
                  <span className="text-2xl" aria-hidden="true">{item.emoji}</span>
                  <p className="mt-2 text-sm font-semibold text-gray-900">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
            <ResponsiveImage image={image} role="card" imgClassName="h-full w-full object-cover" />
            <div
              className="absolute inset-0 bg-gradient-to-t from-coastal-900/30 to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
