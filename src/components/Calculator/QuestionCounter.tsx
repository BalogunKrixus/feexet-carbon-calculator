interface QuestionCounterProps {
  currentQuestion: number;
  totalQuestions: number;
  category: string;
}

export const QuestionCounter = ({ currentQuestion, totalQuestions, category }: QuestionCounterProps) => {
  return (
    <div className="text-sm text-gray-600">
      {category}: Question {currentQuestion} of {totalQuestions}
    </div>
  );
};