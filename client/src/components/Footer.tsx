import { Link } from "wouter";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 px-6 bg-white dark:bg-sage-deep border-t border-sage-dark mt-auto">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <span className="text-sage-dark dark:text-sage-medium font-bold text-lg">Schnupfspruch</span>
        </div>
        
        <div className="flex items-center justify-center text-sage-forest dark:text-sage-light text-sm mb-4">
          <Heart size={14} className="text-sage-medium mr-1" /> 
          <span>Traditionell seit Jahrhunderten</span>
        </div>
        
        <p className="text-sage-forest dark:text-sage-light text-sm">
          &copy; {new Date().getFullYear()} Schnupfspruch. Alle Rechte vorbehalten.
        </p>
        
        <div className="mt-4 space-x-6 flex justify-center">
          <Link href="#">
            <span className="text-sage-forest dark:text-sage-light hover:text-sage-medium transition-colors cursor-pointer text-sm">
              Datenschutz
            </span>
          </Link>
          <Link href="#">
            <span className="text-sage-forest dark:text-sage-light hover:text-sage-medium transition-colors cursor-pointer text-sm">
              Impressum
            </span>
          </Link>
          <Link href="#">
            <span className="text-sage-forest dark:text-sage-light hover:text-sage-medium transition-colors cursor-pointer text-sm">
              Kontakt
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
