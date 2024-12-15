import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Leaf, Car, Lightbulb, Recycle, Plane, Home, ShoppingBag, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9'];

const SUGGESTIONS = {
  transport: [
    { icon: <Car />, text: "Consider using public transportation or carpooling more frequently" },
    { icon: <Car />, text: "Try walking or cycling for short distances instead of driving" },
    { icon: <Car />, text: "Maintain your vehicle properly to improve fuel efficiency" },
    { icon: <Car />, text: "Consider switching to an electric or hybrid vehicle" },
    { icon: <Car />, text: "Plan and combine multiple errands into one trip" },
    { icon: <Car />, text: "Join or start a carpool for your daily commute" },
    { icon: <Plane />, text: "Choose direct flights when possible to reduce emissions" },
    { icon: <Plane />, text: "Consider train travel for shorter distances instead of flying" }
  ],
  energy: [
    { icon: <Lightbulb />, text: "Switch to energy-efficient LED bulbs" },
    { icon: <Lightbulb />, text: "Use natural lighting during the day" },
    { icon: <Home />, text: "Improve your home's insulation" },
    { icon: <Home />, text: "Install solar panels or switch to renewable energy sources" },
    { icon: <Home />, text: "Use energy-efficient appliances" },
    { icon: <Home />, text: "Set up a programmable thermostat" },
    { icon: <Home />, text: "Air dry clothes instead of using a dryer" },
    { icon: <Home />, text: "Regular maintenance of AC and heating systems" }
  ],
  waste: [
    { icon: <Recycle />, text: "Start composting organic waste" },
    { icon: <Recycle />, text: "Use reusable bags, bottles, and containers" },
    { icon: <Recycle />, text: "Properly sort recyclables" },
    { icon: <ShoppingBag />, text: "Buy products with minimal packaging" },
    { icon: <ShoppingBag />, text: "Choose products made from recycled materials" },
    { icon: <Recycle />, text: "Donate or repair items instead of throwing them away" },
    { icon: <ShoppingBag />, text: "Buy second-hand items when possible" }
  ],
  food: [
    { icon: <Utensils />, text: "Reduce meat consumption" },
    { icon: <Utensils />, text: "Buy local and seasonal produce" },
    { icon: <Utensils />, text: "Plan meals to reduce food waste" },
    { icon: <Utensils />, text: "Start a small vegetable garden" },
    { icon: <Utensils />, text: "Choose products with sustainable packaging" },
    { icon: <Leaf />, text: "Support local farmers and markets" },
    { icon: <Leaf />, text: "Preserve seasonal fruits and vegetables" }
  ]
};

const getSuggestions = (breakdown: { category: string; value: number }[]) => {
  const suggestions: { icon: JSX.Element; text: string }[] = [];
  const usedSuggestions = new Set();
  
  breakdown.forEach(({ category, value }) => {
    let categoryKey = category.toLowerCase();
    if (value > 0.8) {
      const categorySuggestions = SUGGESTIONS[categoryKey as keyof typeof SUGGESTIONS] || [];
      for (let i = 0; i < 2; i++) {
        let attempts = 0;
        while (attempts < 10) {
          const suggestion = categorySuggestions[Math.floor(Math.random() * categorySuggestions.length)];
          if (suggestion && !usedSuggestions.has(suggestion.text)) {
            suggestions.push(suggestion);
            usedSuggestions.add(suggestion.text);
            break;
          }
          attempts++;
        }
      }
    }
  });

  while (suggestions.length < 5) {
    const categories = Object.keys(SUGGESTIONS);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categorySuggestions = SUGGESTIONS[randomCategory as keyof typeof SUGGESTIONS];
    
    for (const suggestion of categorySuggestions) {
      if (!usedSuggestions.has(suggestion.text)) {
        suggestions.push(suggestion);
        usedSuggestions.add(suggestion.text);
        break;
      }
    }
  }

  return suggestions.slice(0, 5);
};

export const Results = ({ 
  totalEmissions, 
  breakdown, 
  showSuggestions, 
  setShowSuggestions,
  onReset 
}: { 
  totalEmissions: number; 
  breakdown: { category: string; value: number }[];
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  onReset: () => void;
}) => {
  const nigerianAverage = 0.5;
  const percentage = Math.min((totalEmissions / nigerianAverage) * 100, 100);

  return (
    <Card className="p-6 space-y-6 max-w-2xl mx-auto mt-8 mb-8">
      <h3 className="text-xl font-semibold text-title">Your Results</h3>
      
      <div className="space-y-2">
        <p className="text-2xl font-bold text-title">
          {totalEmissions.toFixed(2)} tons CO₂e/year
        </p>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Nigerian average: {nigerianAverage} tons CO₂e/year</span>
          <span className={totalEmissions > nigerianAverage ? "text-red-500 font-medium" : "text-green-500 font-medium"}>
            {totalEmissions > nigerianAverage 
              ? `${((totalEmissions / nigerianAverage) * 100).toFixed(0)}% above average`
              : `${((1 - totalEmissions / nigerianAverage) * 100).toFixed(0)}% below average`
            }
          </span>
        </div>
        <Progress 
          value={percentage} 
          className="h-2" 
          indicatorClassName={percentage > 100 ? "bg-red-500" : "bg-eco-primary"}
        />
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
                indicatorClassName={`bg-[${COLORS[index]}]`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          onClick={() => setShowSuggestions(true)}
          className="bg-eco-primary hover:bg-eco-primary/90"
        >
          How can I reduce my footprint?
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
        >
          Reset Calculator
        </Button>
      </div>

      {showSuggestions && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Suggestions to Reduce Your Carbon Footprint</h4>
          <div className="space-y-4">
            {getSuggestions(breakdown).map((suggestion, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="text-eco-primary">
                  {suggestion.icon}
                </div>
                <p className="text-sm">{suggestion.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center text-sm text-gray-500 mt-8">
        * This calculator provides estimates based on average emission factors in Nigeria
      </div>
      <div className="text-center text-sm text-gray-500 mt-2">
        Built with ❤️ by <a href="https://feexet.com/" target="_blank" rel="noopener noreferrer" className="hover:text-eco-primary">Feexet</a>
      </div>
    </Card>
  );
};
