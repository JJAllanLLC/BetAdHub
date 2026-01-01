import Link from 'next/link';
import { BannerCarousel } from '@/components/BannerCarousel';
import { DirectoryGrid } from '@/components/DirectoryGrid';
import { ClassifiedListings } from '@/components/ClassifiedListings';

export default function DirectoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Betting Directory
        </h1>
        <p className="text-xl text-gray-300">
          Discover top sportsbooks, casinos, and betting tools
        </p>
      </div>

      <div className="mb-12">
        <BannerCarousel />
      </div>

      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Latest Betting Tips & Guides</h2>
          <p className="text-xl text-gray-300">
            Free EV plays, bankroll management, bet type explanations, and sponsored sportsbook reviews
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Free */}
          <Link
            href="/tips/how-to-calculate-expected-value-in-betting"
            className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-betting-green transition group relative"
          >
            <div className="relative h-48 w-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Betting Tips</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 group-hover:text-betting-green transition">
                How to Calculate Expected Value (EV) in Betting
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                Learn the math behind +EV bets and why they're the key to long-term profit.
              </p>
              <span className="inline-block text-betting-green text-sm font-semibold">
                Read More →
              </span>
            </div>
          </Link>

          {/* Card 2 - Sponsored */}
          <Link
            href="/tips/betmgm-review-best-welcome-bonus-2025"
            className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-betting-green transition group relative"
          >
            <span className="absolute top-4 right-4 bg-betting-green text-betting-darker text-xs font-semibold px-3 py-1 rounded z-10">
              Sponsored
            </span>
            <div className="relative h-48 w-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Sportsbook Review</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 group-hover:text-betting-green transition">
                BetMGM Review: Best Welcome Bonus 2025
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                In-depth look at BetMGM's $40 free bets offer and reduced juice lines.
              </p>
              <span className="inline-block text-betting-green text-sm font-semibold">
                Read More →
              </span>
            </div>
          </Link>

          {/* Card 3 - Free */}
          <Link
            href="/tips/bankroll-management-for-beginners"
            className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-betting-green transition group relative"
          >
            <div className="relative h-48 w-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Betting Tips</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 group-hover:text-betting-green transition">
                Bankroll Management for Beginners
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                Essential strategies to protect your betting funds and avoid going broke.
              </p>
              <span className="inline-block text-betting-green text-sm font-semibold">
                Read More →
              </span>
            </div>
          </Link>

          {/* Card 4 - Sponsored */}
          <Link
            href="/tips/paddy-power-guide-50-free-bets-explained"
            className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-betting-green transition group relative"
          >
            <span className="absolute top-4 right-4 bg-betting-green text-betting-darker text-xs font-semibold px-3 py-1 rounded z-10">
              Sponsored
            </span>
            <div className="relative h-48 w-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Sportsbook Review</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 group-hover:text-betting-green transition">
                Paddy Power Guide: $50 Free Bets Explained
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                Full breakdown of Paddy Power's welcome offer and how to maximize it.
              </p>
              <span className="inline-block text-betting-green text-sm font-semibold">
                Read More →
              </span>
            </div>
          </Link>

          {/* Card 5 - Free */}
          <Link
            href="/tips/understanding-asian-handicap-bets"
            className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-betting-green transition group relative"
          >
            <div className="relative h-48 w-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Betting Tips</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 group-hover:text-betting-green transition">
                Understanding Asian Handicap Bets
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                Complete guide to Asian handicaps and why they're popular with sharp bettors.
              </p>
              <span className="inline-block text-betting-green text-sm font-semibold">
                Read More →
              </span>
            </div>
          </Link>

          {/* Card 6 - Free */}
          <Link
            href="/tips/premier-league-weekend-preview"
            className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-betting-green transition group relative"
          >
            <div className="relative h-48 w-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Betting Tips</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 group-hover:text-betting-green transition">
                Premier League Weekend Preview
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                Top matches and value bets for this weekend's Premier League action.
              </p>
              <span className="inline-block text-betting-green text-sm font-semibold">
                Read More →
              </span>
            </div>
          </Link>

          {/* Card 7 - Sponsored */}
          <Link
            href="/tips/draftkings-sportsbook-in-depth-review"
            className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-betting-green transition group relative"
          >
            <span className="absolute top-4 right-4 bg-betting-green text-betting-darker text-xs font-semibold px-3 py-1 rounded z-10">
              Sponsored
            </span>
            <div className="relative h-48 w-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Sportsbook Review</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 group-hover:text-betting-green transition">
                DraftKings Sportsbook In-Depth Review
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                Why DraftKings leads in US betting markets — features, bonuses, and more.
              </p>
              <span className="inline-block text-betting-green text-sm font-semibold">
                Read More →
              </span>
            </div>
          </Link>

          {/* Card 8 - Free */}
          <Link
            href="/tips/top-5-mistakes-new-bettors-make"
            className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-betting-green transition group relative"
          >
            <div className="relative h-48 w-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Betting Tips</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 group-hover:text-betting-green transition">
                Top 5 Mistakes New Bettors Make
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                Common pitfalls and how to avoid them for better long-term results.
              </p>
              <span className="inline-block text-betting-green text-sm font-semibold">
                Read More →
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Reviews</h2>
        <DirectoryGrid type="review" />
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Classified Listings</h2>
        <ClassifiedListings />
      </div>
    </div>
  );
}

