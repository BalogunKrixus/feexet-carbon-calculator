import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Question = {
  id: string;
  category: string;
  text: string;
  options: {
    text: string;
    value: number;
  }[];
};

const foodQuestions: Question[] = [
  {
    id: "diet",
    category: "Food",
    text: "What best describes your typical diet?",
    options: [
      { text: "Meat with most meals", value: 4 },
      { text: "Meat occasionally", value: 3 },
      { text: "Predominantly fish", value: 2 },
      { text: "Vegetarian", value: 1 },
      { text: "Vegan", value: 0 },
    ],
  },
  {
    id: "local",
    category: "Food",
    text: "How often do you consume locally sourced food?",
    options: [
      { text: "Always", value: 0 },
      { text: "Often", value: 1 },
      { text: "Sometimes", value: 2 },
      { text: "Rarely", value: 3 },
    ],
  },
  {
    id: "waste",
    category: "Food",
    text: "How much of your purchased food goes to waste?",
    options: [
      { text: "None", value: 0 },
      { text: "A small amount", value: 1 },
      { text: "A moderate amount", value: 2 },
      { text: "A significant amount", value: 3 },
    ],
  },
];

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const currentQuestion = foodQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / foodQuestions.length) * 100;

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
    if (currentQuestionIndex < foodQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-title text-center mb-4">
            Carbon Footprint Calculator
          </h1>
          <Progress value={progress} className="w-full" />
          <p className="text-center text-gray-600 mt-2">
            Question {currentQuestionIndex + 1} of {foodQuestions.length}
          </p>
        </div>

        <Card className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <Button
                key={option.text}
                onClick={() => handleAnswer(option.value)}
                variant="outline"
                className="w-full justify-start text-left h-auto py-4 px-6"
              >
                {option.text}
              </Button>
            ))}
          </div>
          {currentQuestionIndex > 0 && (
            <Button
              onClick={handleBack}
              variant="ghost"
              className="mt-6"
            >
              Back
            </Button>
          )}
        </Card>
      </div>
      <footer className="mt-8 text-center text-sm text-gray-500">
        Built with ❤️ by <a href="https://feexet.com/" className="hover:underline">Feexet</a>
      </footer>
    </div>
  );
};

export default Index;