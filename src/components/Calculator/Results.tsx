import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, BookOpen, TreePine } from "lucide-react";

const COLORS = ["#2F855A", "#4C51BF", "#F6E05E"];

export const Results = ({
  totalEmissions,
  breakdown,
}: {
  totalEmissions: number;
  breakdown: { category: string; value: number }[];
}) => {
  const nigerianAverage = 0.5;
  const percentage = (totalEmissions / nigerianAverage) * 100;

  const getProgressColor = (index: number) => {
    if (index === 0) return "bg-[#2F855A]";
    if (index === 1) return "bg-[#4C51BF]";
    return "bg-[#F6E05E]";
  };

  return (
    <div className="space-y-4">
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

      {/* Call-to-Action Section */}
      <Card className="p-6 bg-gradient-to-br from-[#2F855A]/5 to-[#4C51BF]/5">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-title">
            Want a More Detailed Analysis?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get a detailed analysis of your carbon footprint, personalized AI recommendations, 
            and actionable insights. Join us to create a sustainable future!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            <div className="flex flex-col items-center space-y-2 p-3">
              <Award className="h-6 w-6 text-[#2F855A]" />
              <h4 className="font-semibold">Detailed Analysis</h4>
              <p className="text-sm text-gray-600">Personalized recommendations and insights</p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-3">
              <TreePine className="h-6 w-6 text-[#4C51BF]" />
              <h4 className="font-semibold">Project Suggestions</h4>
              <p className="text-sm text-gray-600">Local tree planting and renewable energy initiatives</p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-3">
              <BookOpen className="h-6 w-6 text-[#F6E05E]" />
              <h4 className="font-semibold">Educational Content</h4>
              <p className="text-sm text-gray-600">Access eco-friendly product recommendations</p>
            </div>
          </div>

          <Button 
            className="bg-eco-primary hover:bg-eco-primary/90 rounded-full"
          >
            Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <p className="text-sm text-gray-500 italic">
            * This calculator provides estimates based on average emission factors in Nigeria
          </p>
        </div>
      </Card>
    </div>
  );
};
