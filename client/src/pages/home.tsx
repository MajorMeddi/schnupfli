import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import SpruchDisplay from "@/components/SpruchDisplay";

export default function HomePage() {
  const [, navigate] = useLocation();
  const [showSpruch, setShowSpruch] = useState(false);

  // Query for fetching a random Schnupfspruch
  const {
    data: spruch,
    refetch,
    isLoading,
  } = useQuery<{ id: number; text: string; status: string; erstellt_am: string; eingereicht_von?: string }>({
    queryKey: ["/api/spruch/random"],
    enabled: false, // Don't fetch on mount, only when the button is clicked
  });

  // Handle Priis button click
  const handlePriisClick = async () => {
    setShowSpruch(true);
    await refetch();
  };

  // Navigate to submit page
  const goToSubmit = () => {
    navigate("/submit");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-10 py-8 max-w-4xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-sage-dark to-sage-medium animate-fade-in">
        Schnupfsprüche
      </h1>

      {/* Spruch display container */}
      <SpruchDisplay
        show={showSpruch}
        spruch={spruch?.text}
        isLoading={isLoading}
      />

      {/* Priis Button */}
      <Button
        onClick={handlePriisClick}
        size="lg"
        className="bg-sage-medium text-white py-6 px-12 rounded-full text-lg font-semibold animate-pulse-scale hover:bg-sage-dark"
      >
        Priis
      </Button>

      {/* Submit Button */}
      <Button
        onClick={goToSubmit}
        variant="outline"
        className="border border-sage-dark rounded-full py-3 px-8 text-sm font-medium animate-fade-in hover:bg-sage-light hover:text-sage-deep"
      >
        Spruch einreichen
      </Button>
      
      <p className="text-center text-sage-forest dark:text-sage-light text-sm max-w-md animate-fade-in">
        Entdecke traditionelle Schnupfsprüche oder reiche deinen eigenen ein.
      </p>
    </div>
  );
}
