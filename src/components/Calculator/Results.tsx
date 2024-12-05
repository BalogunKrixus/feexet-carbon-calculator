import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const Results = ({
  totalEmissions,
  breakdown,
}: {
  totalEmissions: number;
  breakdown: { category: string; value: number }[];
}) => {
  const nigerianAverage = 0.5; // Tons CO2 per year per capita
  const percentage = (totalEmissions / nigerianAverage) * 100;

  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-xl font-semibold text-eco-primary">Your Results</h3>
      
      <div className="space-y-2">
        <p className="text-2xl font-bold text-eco-dark">
          {totalEmissions.toFixed(2)} tons CO₂e/year
        </p>
        <p className="text-sm text-gray-600">
          Compared to Nigerian average: {nigerianAverage} tons CO₂e/year
        </p>
        <Progress value={percentage} className="h-2" />
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">Breakdown by Category</h4>
        {breakdown.map((item) => (
          <div key={item.category} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{item.category}</span>
              <span>{item.value.toFixed(2)} tons CO₂e/year</span>
            </div>
            <Progress
              value={(item.value / totalEmissions) * 100}
              className="h-1.5"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};