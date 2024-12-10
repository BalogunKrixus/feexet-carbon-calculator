import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question } from "@/types/questions";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  onAnswer: (value: number) => void;
  onBack: () => void;
  showBack: boolean;
}

export const QuestionCard = ({ question, onAnswer, onBack, showBack }: QuestionCardProps) => {
  return (
    <Card className="p-6 bg-white shadow-lg rounded-lg animate-fade-in">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-title">{question.text}</h2>
        <p className="text-sm text-muted-foreground italic">{question.hint}</p>
        <div className="space-y-3">
          {question.options.map((option) => (
            <Button
              key={option.text}
              onClick={() => onAnswer(option.value)}
              variant="outline"
              className={cn(
                "w-full justify-start text-left h-auto py-4 px-6",
                "hover:bg-eco-primary/10 hover:border-eco-primary",
                "transition-all duration-200"
              )}
            >
              {option.text}
            </Button>
          ))}
        </div>
        {showBack && (
          <Button
            onClick={onBack}
            variant="ghost"
            className="mt-6 flex items-center gap-2 text-eco-primary hover:text-eco-primary/80"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
        )}
      </div>
    </Card>
  );
};