import { useState } from "react";
import { CategoryNav } from "./CategoryNav";
import { QuestionsSection } from "./QuestionsSection";
import { ProgressBar } from "./ProgressBar";
import { ResultsPage } from "./ResultsPage";
import { Header } from "./Header";
import { Footer } from "./Footer";
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

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const firstQuestionIndex = questions.findIndex(q => q.category === category);
    if (firstQuestionIndex !== -1) {
      setCurrentQuestionIndex(firstQuestionIndex);
    }
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
        <Header />

        <CategoryNav 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          answers={answers}
          questions={questions}
        />

        <QuestionsSection 
          categories={categories}
          activeCategory={activeCategory}
          currentQuestion={currentQuestion}
          getCurrentQuestionNumberInCategory={getCurrentQuestionNumberInCategory}
          getCategoryQuestionCount={getCategoryQuestionCount}
          onAnswer={handleAnswer}
          onBack={handleBack}
          showBack={currentQuestionIndex > 0}
        />

        <ProgressBar progress={getTotalProgress()} />
      </div>
      <Footer />
    </div>
  );
};