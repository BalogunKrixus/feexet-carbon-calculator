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
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <ResultsCard totalEmissions={totalEmissions} breakdown={breakdown} />
      </div>
      <div className="bg-gray-50 rounded-lg shadow-sm border p-6">
        <CallToAction />
      </div>
    </div>
  );
};