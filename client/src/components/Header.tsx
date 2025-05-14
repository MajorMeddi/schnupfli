import { Link } from "wouter";

export default function Header() {
  return (
    <header className="py-5 px-6 bg-white dark:bg-sage-deep shadow-sm border-b border-sage-dark sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold text-sage-dark dark:text-sage-medium cursor-pointer hover:scale-105 transition-transform">
            Schnupfspruch
          </span>
        </Link>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link href="/">
                <span className="font-medium text-sage-forest dark:text-sage-light hover:text-sage-medium transition-colors cursor-pointer">
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link href="/submit">
                <span className="font-medium text-sage-forest dark:text-sage-light hover:text-sage-medium transition-colors cursor-pointer">
                  Spruch einreichen
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
