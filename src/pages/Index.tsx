import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { questions } from "@/data/questions";
import { QuestionCard } from "@/components/Calculator/QuestionCard";
import { CategoryScoreCard } from "@/components/Calculator/CategoryScore";
import { CategoryScore } from "@/types/questions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Utensils, Car, Home, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [categoryScores, setCategoryScores] = useState<CategoryScore[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  
  const categories = ["Food", "Travel", "Home", "Stuff"];
  const categoryIcons = {
    Food: Utensils,
    Travel: Car,
    Home: Home,
    Stuff: Package,
  };

  const getCategoryProgress = (category: string) => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const answeredQuestions = categoryQuestions.filter(q => answers[q.id]);
    return (answeredQuestions.length / categoryQuestions.length) * 100;
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

  const getCurrentCategory = () => questions[currentQuestionIndex].category;
  const getPreviousCategory = () => currentQuestionIndex > 0 ? questions[currentQuestionIndex - 1].category : null;

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
          <h1 className="text-3xl font-bold text-title text-center mb-8">
            Carbon Footprint Calculator
          </h1>

          <Tabs defaultValue={categories[0]} className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((category) => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons];
                const progress = getCategoryProgress(category);
                return (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4",
                      "data-[state=active]:bg-eco-primary data-[state=active]:text-white"
                    )}
                    disabled={category !== getCurrentCategory()}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{category}</span>
                    <Progress 
                      value={progress} 
                      className="w-full h-1 bg-gray-200"
                      indicatorClassName={cn(
                        "bg-eco-secondary",
                        "data-[state=active]:bg-white"
                      )}
                    />
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                {currentQuestion.category === category && (
                  <>
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
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      <footer className="mt-8 text-center text-sm text-gray-500">
        Built with ❤️ by <a href="https://feexet.com/" className="hover:underline">Feexet</a>
      </footer>
    </div>
  );
};

export default Index;