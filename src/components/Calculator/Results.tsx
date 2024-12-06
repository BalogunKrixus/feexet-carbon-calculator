import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Leaf, Car, Lightbulb, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLORS = ["#2F855A", "#4C51BF", "#F6E05E"];

const getSuggestions = (breakdown: { category: string; value: number }[]) => {
  const suggestions: { icon: JSX.Element; text: string }[] = [];
  
  breakdown.forEach(({ category, value }) => {
    if (category === "Transport" && value > 1) {
      suggestions.push({
        icon: <Car className="w-5 h-5 text-eco-primary" />,
        text: "Consider using public transportation or carpooling more frequently to reduce your transport emissions."
      });
      suggestions.push({
        icon: <Car className="w-5 h-5 text-eco-primary" />,
        text: "Try walking or cycling for short distances instead of driving."
      });
    }
    
    if (category === "Energy" && value > 1.5) {
      suggestions.push({
        icon: <Lightbulb className="w-5 h-5 text-eco-primary" />,
        text: "Switch to energy-efficient LED bulbs and turn off appliances when not in use."
      });
      suggestions.push({
        icon: <Lightbulb className="w-5 h-5 text-eco-primary" />,
        text: "Consider using natural lighting during the day and reduce generator usage when possible."
      });
    }
    
    if (category === "Waste" && value > 0.5) {
      suggestions.push({
        icon: <Recycle className="w-5 h-5 text-eco-primary" />,
        text: "Increase your recycling efforts and try composting organic waste."
      });
    }
  });

  // Always add general suggestions to ensure we have at least 3
  if (suggestions.length < 3) {
    suggestions.push({
      icon: <Leaf className="w-5 h-5 text-eco-primary" />,
      text: "Plant trees or support local environmental initiatives to offset your carbon footprint."
    });
    suggestions.push({
      icon: <Recycle className="w-5 h-5 text-eco-primary" />,
      text: "Start a home composting system to reduce organic waste."
    });
    suggestions.push({
      icon: <Lightbulb className="w-5 h-5 text-eco-primary" />,
      text: "Use energy-efficient appliances and turn off lights when not in use."
    });
  }

  // Return 3-5 suggestions
  return suggestions.slice(0, 5);
};

export const Results = ({
  totalEmissions,
  breakdown,
  showSuggestions,
  setShowSuggestions,
}: {
  totalEmissions: number;
  breakdown: { category: string; value: number }[];
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
}) => {
  const nigerianAverage = 0.5; // tons CO2e/year
  const percentage = Math.min((totalEmissions / nigerianAverage) * 100, 100); // Cap at 100%
  const suggestions = getSuggestions(breakdown);

  const getProgressColor = (index: number) => {
    if (index === 0) return "bg-[#2F855A]";
    if (index === 1) return "bg-[#4C51BF]";
    return "bg-[#F6E05E]";
  };

  return (
    <Card className="p-6 space-y-6">
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
          indicatorClassName={percentage > 100 ? "bg-red-500" : "bg-eco-primary"}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%+</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div className="space-y-4">
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

      <div className="flex justify-center">
        <Button
          onClick={() => setShowSuggestions(true)}
          className="bg-eco-primary hover:bg-eco-primary/90"
        >
          How can I reduce my carbon footprint?
        </Button>
      </div>

      {showSuggestions && (
        <div className="mt-8 border-t pt-6">
          <h4 className="font-semibold text-title mb-4">Suggestions to Reduce Your Carbon Footprint</h4>
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-3">
                {suggestion.icon}
                <p className="text-sm text-gray-600">{suggestion.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};