import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface CategoryScoreProps {
  category: string;
  score: number;
}

export const CategoryScoreCard = ({ category, score }: CategoryScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score <= 33) return "bg-green-500";
    if (score <= 66) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getMessage = (score: number) => {
    if (score <= 33) return "Great job! Your impact is relatively low.";
    if (score <= 66) return "There's room for improvement in reducing your impact.";
    return "Consider taking steps to reduce your environmental impact in this category.";
  };

  return (
    <Card className="mb-6 p-6 bg-white shadow-lg rounded-lg animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <CheckCircle2 className="w-6 h-6 text-eco-primary" />
        <h2 className="text-xl font-semibold text-title">
          {category} Category Complete!
        </h2>
      </div>
      <p className="text-gray-600 mb-4">
        Your impact score for this category: {score.toFixed(1)}%
      </p>
      <Progress 
        value={score} 
        className="h-2 mb-2"
        indicatorClassName={cn(
          getScoreColor(score),
          "transition-all duration-500"
        )}
      />
      <p className="text-sm text-gray-500 mt-2">
        {getMessage(score)}
      </p>
    </Card>
  );
};