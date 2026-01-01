import { BannerCarousel } from './BannerCarousel';
import { TipsGrid } from './TipsGrid';

export function DirectoryHomepage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Betting Directory
        </h1>
        <p className="text-xl text-gray-300">
          Find the best sportsbooks, casinos, and betting tools
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
        <TipsGrid />
      </div>
    </div>
  );
}

