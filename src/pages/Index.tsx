import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuestionCard } from "@/components/Calculator/QuestionCard";
import { CategoryProgress } from "@/components/Calculator/CategoryProgress";
import { CategoryIcon } from "@/components/Calculator/CategoryIcon";

const questions: Question[] = [
  // Food Category
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
  // Travel Category
  {
    id: "driving",
    category: "Travel",
    text: "How many kilometers do you drive weekly?",
    options: [
      { text: "Less than 50 km", value: 1 },
      { text: "50-100 km", value: 2 },
      { text: "100-200 km", value: 3 },
      { text: "Over 200 km", value: 4 },
    ],
  },
  {
    id: "public_transport",
    category: "Travel",
    text: "How often do you use public transport (buses, BRT, trains)?",
    options: [
      { text: "Daily", value: 1 },
      { text: "A few times a week", value: 2 },
      { text: "Occasionally", value: 3 },
      { text: "Never", value: 4 },
    ],
  },
  {
    id: "domestic_flights",
    category: "Travel",
    text: "How many domestic flights do you take annually?",
    options: [
      { text: "None", value: 0 },
      { text: "1-2", value: 1 },
      { text: "3-5", value: 2 },
      { text: "More than 5", value: 3 },
    ],
  },
  {
    id: "international_flights",
    category: "Travel",
    text: "How many international flights do you take annually?",
    options: [
      { text: "None", value: 0 },
      { text: "1-2", value: 2 },
      { text: "3-5", value: 4 },
      { text: "More than 5", value: 6 },
    ],
  },
  // Home Category
  {
    id: "energy_source",
    category: "Home",
    text: "What is your primary source of household energy?",
    options: [
      { text: "National grid electricity", value: 2 },
      { text: "Generator", value: 4 },
      { text: "Solar power", value: 0 },
      { text: "Other", value: 3 },
    ],
  },
  {
    id: "electricity_hours",
    category: "Home",
    text: "On average, how many hours per day do you have electricity?",
    options: [
      { text: "Less than 4 hours", value: 1 },
      { text: "4-8 hours", value: 2 },
      { text: "8-12 hours", value: 3 },
      { text: "More than 12 hours", value: 4 },
    ],
  },
  {
    id: "generator_fuel",
    category: "Home",
    text: "If you use a generator, how many liters of fuel does it consume weekly?",
    options: [
      { text: "Less than 10 liters", value: 1 },
      { text: "10-20 liters", value: 2 },
      { text: "20-50 liters", value: 3 },
      { text: "Over 50 liters", value: 4 },
    ],
  },
  {
    id: "cooking_fuel",
    category: "Home",
    text: "What type of fuel do you primarily use for cooking?",
    options: [
      { text: "Firewood", value: 4 },
      { text: "Charcoal", value: 3 },
      { text: "Kerosene", value: 2 },
      { text: "Liquefied Petroleum Gas (LPG)", value: 1 },
      { text: "Electricity", value: 0 },
    ],
  },
  // Stuff Category
  {
    id: "clothing",
    category: "Stuff",
    text: "How often do you buy new clothing?",
    options: [
      { text: "Monthly", value: 4 },
      { text: "Quarterly", value: 3 },
      { text: "Biannually", value: 2 },
      { text: "Rarely", value: 1 },
    ],
  },
  {
    id: "electronics",
    category: "Stuff",
    text: "How frequently do you purchase new electronic devices (phones, laptops, etc.)?",
    options: [
      { text: "Annually", value: 4 },
      { text: "Every 2-3 years", value: 3 },
      { text: "Every 4-5 years", value: 2 },
      { text: "Rarely", value: 1 },
    ],
  },
  {
    id: "waste_management",
    category: "Stuff",
    text: "How do you dispose of household waste?",
    options: [
      { text: "Regular waste collection services", value: 1 },
      { text: "Burning", value: 4 },
      { text: "Dumping in open areas", value: 3 },
      { text: "Composting/recycling", value: 0 },
    ],
  },
];

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [categoryScores, setCategoryScores] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState("Food");

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const categories = ["Food", "Travel", "Home", "Stuff"];
  
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
      
      setCategoryScores(prev => ({
        ...prev,
        [currentCategory]: normalizedScore
      }));

      // Move to next category
      const currentCategoryIndex = categories.indexOf(currentCategory);
      if (currentCategoryIndex < categories.length - 1) {
        setActiveCategory(categories[currentCategoryIndex + 1]);
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      const previousQuestion = questions[currentQuestionIndex - 1];
      setActiveCategory(previousQuestion.category);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center mb-4">
            Carbon Footprint Calculator
          </h1>
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <CategoryIcon category={category} />
                <span className="hidden sm:inline">{category}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <CategoryProgress
                category={category}
                progress={getCategoryProgress(category)}
              />
              {currentQuestion.category === category && (
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  onBack={handleBack}
                  showBack={currentQuestionIndex > 0}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <footer className="mt-8 text-center text-sm text-gray-500">
        Built with ❤️ by <a href="https://feexet.com/" className="hover:underline">Feexet</a>
      </footer>
    </div>
  );
};

export default Index;
