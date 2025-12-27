import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-betting-darker mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-betting-green font-bold mb-4">BetAdHub</h3>
            <p className="text-gray-400 text-sm">
              Affordable advertising for betting sites, sportsbooks, and casinos.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/advertise" className="hover:text-betting-green transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/directory" className="hover:text-betting-green transition">
                  Directory
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/terms" className="hover:text-betting-green transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-betting-green transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-betting-green transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 text-sm">
              Email: support@betadhub.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} BetAdHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

