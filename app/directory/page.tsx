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

