import { useState } from "react";
import { CategoryNav } from "./CategoryNav";
import { QuestionCard } from "./QuestionCard";
import { QuestionCounter } from "./QuestionCounter";
import { ResultsPage } from "./ResultsPage";
import type { Question } from "@/types/calculator";

interface CalculatorProps {
  questions: Question[];
}

export const Calculator = ({ questions }: CalculatorProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [categoryScores, setCategoryScores] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState("Food");
  const [isComplete, setIsComplete] = useState(false);

  const categories = ["Food", "Travel", "Home", "Stuff"];
  const currentQuestion = questions[currentQuestionIndex];
  
  const getCategoryQuestionCount = (category: string) => {
    return questions.filter(q => q.category === category).length;
  };

  const getCurrentQuestionNumberInCategory = (category: string) => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const currentCategoryQuestionIndex = categoryQuestions.findIndex(q => q.id === currentQuestion.id);
    return currentCategoryQuestionIndex + 1;
  };

  const getTotalProgress = () => {
    const answeredQuestions = Object.keys(answers).length;
    return (answeredQuestions / questions.length) * 100;
  };

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));

    const currentCategory = currentQuestion.category;
    const categoryQuestions = questions.filter(q => q.category === currentCategory);
    const isLastQuestionInCategory = categoryQuestions[categoryQuestions.length - 1].id === currentQuestion.id;

    if (isLastQuestionInCategory) {
      const categoryAnswers = categoryQuestions.map(q => answers[q.id] || 0);
      const totalScore = categoryAnswers.reduce((sum, score) => sum + score, 0) + value;
      const normalizedScore = (totalScore / (categoryQuestions.length * 4)) * 100;
      
      setCategoryScores(prev => ({
        ...prev,
        [currentCategory]: normalizedScore
      }));

      const currentCategoryIndex = categories.indexOf(currentCategory);
      if (currentCategoryIndex < categories.length - 1) {
        setActiveCategory(categories[currentCategoryIndex + 1]);
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      const previousQuestion = questions[currentQuestionIndex - 1];
      setActiveCategory(previousQuestion.category);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCategoryScores({});
    setActiveCategory("Food");
    setIsComplete(false);
  };

  if (isComplete) {
    const totalEmissions = Object.values(answers).reduce((sum, value) => sum + value, 0) / 10;
    const breakdown = categories.map(category => ({
      category,
      value: questions
        .filter(q => q.category === category)
        .reduce((sum, q) => sum + (answers[q.id] || 0), 0) / 10
    }));

    return (
      <ResultsPage
        totalEmissions={totalEmissions}
        breakdown={breakdown}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-title mb-8">
          Carbon Footprint Calculator
        </h1>

        <CategoryNav 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

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
                  onAnswer={handleAnswer}
                  onBack={handleBack}
                  showBack={currentQuestionIndex > 0}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="text-sm text-gray-600 text-center mb-2">
            Total Progress: {Math.round(getTotalProgress())}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-eco-primary h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${getTotalProgress()}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
