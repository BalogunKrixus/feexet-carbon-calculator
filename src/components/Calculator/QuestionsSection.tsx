import { QuestionCounter } from "./QuestionCounter";
import { QuestionCard } from "./QuestionCard";
import type { Question } from "@/types/calculator";

interface QuestionsSectionProps {
  categories: string[];
  activeCategory: string;
  currentQuestion: Question;
  getCurrentQuestionNumberInCategory: (category: string) => number;
  getCategoryQuestionCount: (category: string) => number;
  onAnswer: (value: number) => void;
  onBack: () => void;
  showBack: boolean;
}

export const QuestionsSection = ({
  categories,
  activeCategory,
  currentQuestion,
  getCurrentQuestionNumberInCategory,
  getCategoryQuestionCount,
  onAnswer,
  onBack,
  showBack
}: QuestionsSectionProps) => {
  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category} className={category === activeCategory ? 'block' : 'hidden'}>
          <QuestionCounter
            category={category}
            currentQuestion={getCurrentQuestionNumberInCategory(category)}
            totalQuestions={getCategoryQuestionCount(category)}
          />
          {currentQuestion.category === category && (
            <QuestionCard
              question={currentQuestion}
              onAnswer={onAnswer}
              onBack={onBack}
              showBack={showBack}
            />
          )}
        </div>
      ))}
    </div>
  );
};