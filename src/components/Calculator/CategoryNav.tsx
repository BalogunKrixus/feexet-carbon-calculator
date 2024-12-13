import { CategoryIcon } from "./CategoryIcon";

interface CategoryNavProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  answers: Record<string, number>;
  questions: { id: string; category: string }[];
}

export const CategoryNav = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  answers,
  questions
}: CategoryNavProps) => {
  const isCategoryEnabled = (category: string) => {
    if (category === "Food") return true;
    
    const categoryIndex = categories.indexOf(category);
    const previousCategory = categories[categoryIndex - 1];
    const previousCategoryQuestions = questions.filter(q => q.category === previousCategory);
    
    // Allow clicking if it's a previous category or if the previous category is completed
    return category === activeCategory || 
           categories.indexOf(category) < categories.indexOf(activeCategory) ||
           previousCategoryQuestions.every(q => answers[q.id] !== undefined);
  };

  return (
    <div className="flex space-x-2 justify-center">
      {categories.map((category) => {
        const isEnabled = isCategoryEnabled(category);
        return (
          <button
            key={category}
            onClick={() => isEnabled && onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              category === activeCategory
                ? "bg-eco-primary text-white"
                : isEnabled
                ? "bg-gray-100 hover:bg-gray-200"
                : "bg-gray-100 opacity-50 cursor-not-allowed"
            }`}
            disabled={!isEnabled}
          >
            <CategoryIcon category={category} className="w-4 h-4" />
            {category}
          </button>
        );
      })}
    </div>
  );
};