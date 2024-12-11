import { Results } from "./Results";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface ResultsPageProps {
  totalEmissions: number;
  breakdown: { category: string; value: number }[];
  onReset: () => void;
}

export const ResultsPage = ({ totalEmissions, breakdown, onReset }: ResultsPageProps) => {
  return (
    <div className="space-y-6">
      <Button 
        onClick={onReset}
        variant="ghost"
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Start Over
      </Button>
      
      <Results 
        totalEmissions={totalEmissions} 
        breakdown={breakdown}
        showSuggestions={true}
        setShowSuggestions={() => {}}
      />
    </div>
  );
};