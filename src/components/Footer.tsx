import Link from "next/link";
import { SITE, AFFILIATE_DISCLOSURE_SHORT } from "@/lib/site";
import { DestinationLogo } from "@/components/DestinationLogo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-depth mt-auto text-white">
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="container-wide grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="inline-flex rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-maple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-coastal-900"
              aria-label={`${SITE.name} — home`}
            >
              <DestinationLogo variant="compact" tone="on-dark" decorative />
            </Link>
            <p className="mt-4 text-sm text-coastal-100/70 leading-relaxed">
              Helping cruise passengers choose between Ravenna&apos;s mosaics, Bologna, San Marino and
              post-cruise Venice with honest independent advice for every day at Porto Corsini.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium text-white/90">Compare your day</h3>
            <ul className="space-y-1.5 text-sm text-coastal-100/70">
              <li><Link href="/ravenna-or-bologna-from-the-cruise-port" className="hover:text-white">Ravenna or Bologna?</Link></li>
              <li><Link href="/ravenna-or-san-marino-from-the-cruise-port" className="hover:text-white">Ravenna or San Marino?</Link></li>
              <li><Link href="/best-ravenna-shore-excursions" className="hover:text-white">Best Ravenna excursions</Link></li>
              <li><Link href="/compare" className="hover:text-white">All comparisons</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium text-white/90">Plan your port day</h3>
            <ul className="space-y-1.5 text-sm text-coastal-100/70">
              <li><Link href="/cruise-planner" className="hover:text-white">Ravenna Cruise Planner</Link></li>
              <li><Link href="/shore-excursions" className="hover:text-white">Shore Excursions</Link></li>
              <li><Link href="/ravenna-cruise-schedule" className="hover:text-white">Ship Schedule</Link></li>
              <li><Link href="/things-to-do-in-ravenna-from-a-cruise" className="hover:text-white">Things to do in Ravenna</Link></li>
              <li><Link href="/cruise-port-guide" className="hover:text-white">Porto Corsini Port Guide</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium text-white/90">Legal &amp; contact</h3>
            <ul className="space-y-1.5 text-sm text-coastal-100/70">
              <li><Link href="/affiliate-disclosure" className="hover:text-white">Affiliate Disclosure</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/enquire" className="hover:text-white">Enquire</Link></li>
            </ul>
          </div>
        </div>
        <div className="container-wide mt-10 border-t border-white/10 pt-6 text-xs text-coastal-100/60">
          <p className="max-w-3xl leading-relaxed">{AFFILIATE_DISCLOSURE_SHORT}</p>
        </div>
        <div className="container-wide mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-coastal-100/60">
          <DestinationLogo variant="mark" tone="on-dark" className="opacity-90" decorative />
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/faq" className="hover:text-white">FAQ</Link>
          <Link href="/affiliate-disclosure" className="hover:text-white">Affiliate Disclosure</Link>
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <span className="ml-auto">{SITE.email}</span>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-coastal-300/75">
        &copy; {year} {SITE.name}. Independent Ravenna cruise planning resource — not affiliated with any cruise line or the Port of Ravenna.
      </div>
    </footer>
  );
}
