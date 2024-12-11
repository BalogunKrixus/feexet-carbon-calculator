import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryIcon } from "./CategoryIcon";

interface CategoryNavProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryNav = ({ categories, activeCategory, onCategoryChange }: CategoryNavProps) => {
  return (
    <Tabs value={activeCategory} onValueChange={onCategoryChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        {categories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className="flex items-center gap-2 data-[state=active]:bg-eco-primary data-[state=active]:text-white"
          >
            <CategoryIcon category={category} className="w-4 h-4" />
            <span className="hidden sm:inline">{category}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};