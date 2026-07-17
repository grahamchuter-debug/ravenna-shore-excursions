import Link from "next/link";

const RAVENNA_LINKS = [
  {
    title: "Ravenna or Bologna?",
    description:
      "Compare mosaic interiors with Bologna's porticoes and San Luca walk — road time, walking and who each suits.",
    href: "/ravenna-or-bologna-from-the-cruise-port",
  },
  {
    title: "Ravenna or San Marino?",
    description:
      "Flat mosaic city versus a private hilltop micro-state with towers and tastings — candid trade-offs.",
    href: "/ravenna-or-san-marino-from-the-cruise-port",
  },
  {
    title: "Things to do in Ravenna from a cruise",
    description:
      "Honest transfer time from Porto Corsini plus a mosaic-first route for independent explorers.",
    href: "/things-to-do-in-ravenna-from-a-cruise",
  },
  {
    title: "Best Ravenna shore excursions",
    description:
      "Only the three live partner products — post-cruise Venice, Bologna and private San Marino.",
    href: "/best-ravenna-shore-excursions",
  },
  {
    title: "Porto Corsini cruise port guide",
    description:
      "Terminal layout, distance to Ravenna, taxis and return-to-ship planning.",
    href: "/cruise-port-guide",
  },
  {
    title: "Ravenna cruise ship schedule",
    description:
      "Check your published port hours before committing to Bologna, San Marino or a mosaic day.",
    href: "/ravenna-cruise-schedule",
  },
];

export function RavennaPlanningLinks() {
  return (
    <section className="section-padding bg-coastal-50 border-t border-coastal-100">
      <div className="container-wide">
        <p className="section-eyebrow">Keep planning</p>
        <h2 className="section-title mt-2">Your Ravenna planning hub</h2>
        <p className="section-subtitle">
          Use these guides and comparisons to shape a port day that matches your ship hours,
          interests and whether you are calling, embarking or disembarking at Porto Corsini.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RAVENNA_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="card-feature group">
              <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-coastal-800">
                {link.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{link.description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/guides" className="btn-secondary text-sm">
            All Ravenna planning guides
          </Link>
        </div>
      </div>
    </section>
  );
}
