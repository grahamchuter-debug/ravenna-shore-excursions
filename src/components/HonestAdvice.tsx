import Link from "next/link";

export function HonestAdvice() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide max-w-4xl">
        <p className="section-eyebrow">Honest advice</p>
        <h2 className="section-title mt-2">Do you need a shore excursion in Ravenna?</h2>
        <p className="section-subtitle">
          The honest answer: Ravenna itself can be done independently once you accept the road
          transfer from Porto Corsini. An excursion earns its place when you want Bologna, San
          Marino or a guided post-cruise transfer to Venice.
        </p>

        <div className="mt-10 space-y-8">
          <div className="card-feature">
            <h3 className="font-display text-xl font-bold text-gray-900">
              Ravenna is realistic independently — with transfer time built in
            </h3>
            <p className="mt-3 text-gray-700 leading-relaxed">
              The historic centre is compact and relatively flat once you reach it, making an
              independent mosaic day realistic for most passengers:
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-coastal-600">✓</span> San Vitale &amp; Galla Placidia mosaics
              </li>
              <li className="flex items-center gap-2">
                <span className="text-coastal-600">✓</span> Neonian Baptistery &amp; Sant&apos;Apollinare Nuovo
              </li>
              <li className="flex items-center gap-2">
                <span className="text-coastal-600">✓</span> Piazza del Popolo &amp; a simple lunch
              </li>
              <li className="flex items-center gap-2">
                <span className="text-coastal-600">✓</span> Taxi or bus from Porto Corsini (~30 min)
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Set a 60–90 minute return buffer and confirm your all-aboard time. The ship will not wait.
            </p>
          </div>

          <div className="card-accent">
            <h3 className="font-display text-xl font-bold text-gray-900">
              Bologna, San Marino and Venice need more planning
            </h3>
            <p className="mt-3 text-gray-700 leading-relaxed">
              These destinations are too far from Porto Corsini for casual exploring. Organised
              transport and disciplined timing matter for:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-maple-600 mt-0.5">→</span>
                <span>
                  <strong>Bologna</strong> — about an hour each way, San Luca&apos;s porticoed walk and free time
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-maple-600 mt-0.5">→</span>
                <span>
                  <strong>San Marino</strong> — a private hilltop day with towers, tastings and steep lanes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-maple-600 mt-0.5">→</span>
                <span>
                  <strong>Post-cruise Venice</strong> — a one-way disembarkation transfer, not a same-day round trip
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/ravenna-or-bologna-from-the-cruise-port" className="btn-secondary text-sm">
            Ravenna or Bologna?
          </Link>
          <Link href="/compare/can-you-explore-ravenna-independently" className="btn-secondary text-sm">
            Explore independently?
          </Link>
          <Link href="/things-to-do-in-ravenna-from-a-cruise" className="btn-secondary text-sm">
            Things to do in Ravenna
          </Link>
        </div>
      </div>
    </section>
  );
}
