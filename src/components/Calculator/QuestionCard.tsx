import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "./CategoryIcon";
import { ChevronLeft } from "lucide-react";

interface QuestionCardProps {
  question: {
    category: string;
    text: string;
    options: { text: string; value: number }[];
  };
  onAnswer: (value: number) => void;
  onBack: () => void;
  showBack: boolean;
}

export const QuestionCard = ({ question, onAnswer, onBack, showBack }: QuestionCardProps) => {
  return (
    <Card className="p-6 bg-white shadow-lg rounded-lg space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <CategoryIcon category={question.category} />
        <h2 className="text-xl font-semibold">{question.text}</h2>
      </div>
      
      <div className="space-y-4">
        {question.options.map((option) => (
          <Button
            key={option.text}
            onClick={() => onAnswer(option.value)}
            variant="outline"
            className="w-full justify-start text-left h-auto py-4 px-6 hover:bg-gray-50"
          >
            {option.text}
          </Button>
        ))}
      </div>
      
      {showBack && (
        <Button
          onClick={onBack}
          variant="ghost"
          className="mt-6 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
      )}
    </Card>
  );
};