import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { questions } from "@/data/questions";
import { QuestionCard } from "@/components/Calculator/QuestionCard";
import { CategoryScoreCard } from "@/components/Calculator/CategoryScore";
import { CategoryScore } from "@/types/questions";

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [categoryScores, setCategoryScores] = useState<CategoryScore[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));

    // Calculate category score when all questions in a category are answered
    const currentCategory = currentQuestion.category;
    const categoryQuestions = questions.filter(q => q.category === currentCategory);
    const isLastQuestionInCategory = categoryQuestions[categoryQuestions.length - 1].id === currentQuestion.id;

    if (isLastQuestionInCategory) {
      const categoryAnswers = categoryQuestions.map(q => answers[q.id] || 0);
      const totalScore = categoryAnswers.reduce((sum, score) => sum + score, 0) + value;
      const normalizedScore = (totalScore / (categoryQuestions.length * 4)) * 100;
      
      setCategoryScores(prev => [...prev, {
        category: currentCategory,
        score: normalizedScore
      }]);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const getCurrentCategory = () => {
    return questions[currentQuestionIndex].category;
  };

  const getPreviousCategory = () => {
    if (currentQuestionIndex === 0) return null;
    return questions[currentQuestionIndex - 1].category;
  };

  // Check if we just changed categories
  const showCategoryScore = () => {
    const currentCategory = getCurrentCategory();
    const previousCategory = getPreviousCategory();
    return previousCategory && previousCategory !== currentCategory && 
           categoryScores.find(score => score.category === previousCategory);
  };

  const lastCategoryScore = showCategoryScore() 
    ? categoryScores.find(score => score.category === getPreviousCategory())
    : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-title text-center mb-4">
            Carbon Footprint Calculator
          </h1>
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>Category: {currentQuestion.category}</span>
          </div>
        </div>

        {lastCategoryScore && (
          <CategoryScoreCard 
            category={lastCategoryScore.category}
            score={lastCategoryScore.score}
          />
        )}

        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          onBack={handleBack}
          showBack={currentQuestionIndex > 0}
        />
      </div>
      <footer className="mt-8 text-center text-sm text-gray-500">
        Built with ❤️ by <a href="https://feexet.com/" className="hover:underline">Feexet</a>
      </footer>
    </div>
  );
};

export default Index;