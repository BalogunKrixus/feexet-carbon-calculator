import { Results } from "./Results";
import { useState } from "react";

interface ResultsPageProps {
  totalEmissions: number;
  breakdown: { category: string; value: number }[];
  onReset: () => void;
}

export const ResultsPage = ({ totalEmissions, breakdown, onReset }: ResultsPageProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="space-y-6">
      <Results 
        totalEmissions={totalEmissions} 
        breakdown={breakdown}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        onReset={onReset}
      />
    </div>
  );
};