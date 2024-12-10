import { House, Car, ShoppingBag, Utensils } from "lucide-react";

interface CategoryIconProps {
  category: string;
  className?: string;
}

export const CategoryIcon = ({ category, className = "w-5 h-5" }: CategoryIconProps) => {
  switch (category) {
    case "Food":
      return <Utensils className={className} />;
    case "Travel":
      return <Car className={className} />;
    case "Home":
      return <House className={className} />;
    case "Stuff":
      return <ShoppingBag className={className} />;
    default:
      return null;
  }
};