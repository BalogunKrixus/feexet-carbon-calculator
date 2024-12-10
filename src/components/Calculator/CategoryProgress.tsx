import { Progress } from "@/components/ui/progress";

interface CategoryProgressProps {
  category: string;
  progress: number;
}

export const CategoryProgress = ({ category, progress }: CategoryProgressProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{category}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};