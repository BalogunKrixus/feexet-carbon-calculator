import { Progress } from "@/components/ui/progress";

interface ProgressHeaderProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

export const ProgressHeader = ({ currentQuestionIndex, totalQuestions }: ProgressHeaderProps) => {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-center text-title mb-4">
        Carbon Footprint Calculator
      </h1>
      <Progress value={progress} className="w-full" />
      <div className="flex justify-between text-sm text-gray-600">
        <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
    </div>
  );
};