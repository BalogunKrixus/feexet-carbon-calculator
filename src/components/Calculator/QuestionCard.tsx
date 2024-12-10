import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question } from "@/types/questions";
import { ChevronLeft } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  onAnswer: (value: number) => void;
  onBack: () => void;
  showBack: boolean;
}

export const QuestionCard = ({ question, onAnswer, onBack, showBack }: QuestionCardProps) => {
  return (
    <Card className="p-6 bg-white shadow-lg rounded-lg">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground italic">{question.hint}</p>
        <h2 className="text-xl font-semibold">{question.text}</h2>
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
      </div>
    </Card>
  );
};