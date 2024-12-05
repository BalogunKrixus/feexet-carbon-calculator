import { ResultsCard } from "./Results/ResultsCard";
import { CallToAction } from "./Results/CallToAction";

export const Results = ({
  totalEmissions,
  breakdown,
}: {
  totalEmissions: number;
  breakdown: { category: string; value: number }[];
}) => {
  return (
    <div className="space-y-4">
      <ResultsCard totalEmissions={totalEmissions} breakdown={breakdown} />
      <CallToAction />
    </div>
  );
};