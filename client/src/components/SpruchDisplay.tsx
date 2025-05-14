import { Skeleton } from "@/components/ui/skeleton";
import { Quote } from "lucide-react";

interface SpruchDisplayProps {
  show: boolean;
  spruch?: string;
  isLoading: boolean;
}

export default function SpruchDisplay({ show, spruch, isLoading }: SpruchDisplayProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="w-full max-w-xl bg-white dark:bg-sage-deep rounded-xl p-8 shadow-lg border border-sage-dark mb-8 min-h-[150px] flex flex-col items-center justify-center animate-slide-up relative overflow-hidden card-hover">
      {/* Decorative quote marks */}
      <div className="absolute top-4 left-4 text-sage-medium/20">
        <Quote size={36} />
      </div>
      <div className="absolute bottom-4 right-4 text-sage-medium/20 transform rotate-180">
        <Quote size={36} />
      </div>
      
      {isLoading ? (
        <div className="space-y-3 w-full max-w-lg">
          <Skeleton className="w-3/4 h-6 mx-auto" />
          <Skeleton className="w-1/2 h-6 mx-auto" />
        </div>
      ) : (
        <p className="text-center text-lg md:text-xl font-medium italic text-foreground z-10 px-6">
          {spruch}
        </p>
      )}
    </div>
  );
}
