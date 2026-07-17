import Link from "next/link";

const LINKS = [
  { href: "/cruise-port-guide", label: "Porto Corsini Port Guide" },
  { href: "/cruise-planner", label: "Ravenna Cruise Planner" },
  { href: "/ravenna-cruise-schedule", label: "Ship Schedule" },
  { href: "/compare", label: "Compare Options" },
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
];

export function PlanningLinks() {
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      {LINKS.map((link) => (
        <Link key={link.href} href={link.href} className="btn-secondary text-sm">
          {link.label}
        </Link>
      ))}
    </div>
  );
}
