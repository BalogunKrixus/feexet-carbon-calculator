import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#2F855A", "#4C51BF", "#F6E05E"];

interface ResultsCardProps {
  totalEmissions: number;
  breakdown: { category: string; value: number }[];
}

export const ResultsCard = ({ totalEmissions, breakdown }: ResultsCardProps) => {
  const nigerianAverage = 0.5;
  const percentage = (totalEmissions / nigerianAverage) * 100;

  const getProgressColor = (index: number) => {
    if (index === 0) return "bg-[#2F855A]";
    if (index === 1) return "bg-[#4C51BF]";
    return "bg-[#F6E05E]";
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-xl font-semibold text-title">Your Results</h3>
      
      <div className="space-y-2">
        <p className="text-2xl font-bold text-title">
          {totalEmissions.toFixed(2)} tons CO₂e/year
        </p>
        <p className="text-sm text-gray-600">
          Compared to Nigerian average: {nigerianAverage} tons CO₂e/year
        </p>
        <Progress 
          value={percentage} 
          className="h-2" 
          indicatorClassName="bg-eco-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={breakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {breakdown.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(2)} tons CO₂e`, 'Emissions']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-title">Breakdown by Category</h4>
          {breakdown.map((item, index) => (
            <div key={item.category} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  {item.category}
                </span>
                <span>{item.value.toFixed(2)} tons CO₂e/year</span>
              </div>
              <Progress
                value={(item.value / totalEmissions) * 100}
                className="h-1.5"
                indicatorClassName={getProgressColor(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};