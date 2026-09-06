import { ArrowRight } from "lucide-react";
import { CLUB_SIGNUP_URL } from "@/hooks/use-elevint-catalog";

/**
 * The wine club, invited from the home page.
 *
 * The site had no club call to action anywhere — the two buttons above this
 * send a visitor to read about the wines or about the family, and the only
 * route to a purchase was a bottle-by-bottle link on the wines page. For a
 * winery whose production is small and whose buyers are looking for kosher
 * bottles they cannot easily get elsewhere, the membership is the thing worth
 * asking for on the first screen.
 *
 * The copy deliberately promises nothing specific. Discounts, shipping and
 * shipment cadence live on the club records in EleVint and are stated by the
 * signup page itself, which reads them; repeating a number here would be a
 * second copy to keep in step, and the one that goes stale is always the one
 * on the marketing site.
 *
 * Nothing about visiting: there is no public tasting room, and a club pitch
 * that leans on "come and see us" is a promise this winery cannot keep.
 */
const ClubInvitation = () => {
  return (
    <section className="py-20 bg-wine-deep" aria-labelledby="club-heading">
      <div className="container mx-auto px-8 lg:px-16 max-w-4xl text-center">
        <p className="tracking-[0.2em] uppercase text-xs font-semibold text-wine-gold mb-4">
          The Wine Club
        </p>
        <h2
          id="club-heading"
          className="text-3xl md:text-4xl font-serif text-white mb-6"
        >
          Kosher wine worth keeping a case of
        </h2>
        <p className="text-lg text-white/80 leading-relaxed mb-4">
          We make in small batches, and the best of what we bottle does not last
          long. Members are the first to be offered every new release, at member
          pricing, delivered to the door — so the wine for Shabbat, the holidays
          and everything in between is already in the house.
        </p>
        <p className="text-lg text-white/80 leading-relaxed mb-8">
          Choose how much wine and how often. Skip a shipment, change your mind
          or cancel whenever you like.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={CLUB_SIGNUP_URL}
            className="inline-flex items-center gap-2 bg-wine-bronze hover:bg-wine-gold text-white px-8 py-3 transition-colors duration-300"
          >
            <span className="tracking-wider uppercase text-sm font-semibold">
              See membership options
            </span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="/wines"
            className="inline-flex items-center gap-2 border-2 border-wine-gold text-wine-gold hover:bg-wine-gold hover:text-wine-deep px-8 py-3 transition-colors duration-300"
          >
            <span className="tracking-wider uppercase text-sm font-semibold">
              Shop the current release
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClubInvitation;
