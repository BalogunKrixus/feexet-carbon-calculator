import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CategoryScoreProps {
  category: string;
  score: number;
}

export const CategoryScoreCard = ({ category, score }: CategoryScoreProps) => {
  return (
    <Card className="mb-6 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        {category} Category Complete!
      </h2>
      <p className="text-gray-600 mb-4">
        Your impact score for this category: {score.toFixed(1)}%
      </p>
      <Progress 
        value={score} 
        className="h-2 mb-2"
        indicatorClassName={
          score <= 33 ? "bg-green-500" :
          score <= 66 ? "bg-yellow-500" :
          "bg-red-500"
        }
      />
      <p className="text-sm text-gray-500 mt-2">
        {score <= 33 ? "Great job! Your impact is relatively low." :
         score <= 66 ? "There's room for improvement in reducing your impact." :
         "Consider taking steps to reduce your environmental impact in this category."}
      </p>
    </Card>
  );
};