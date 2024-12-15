interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="mt-8">
      <div className="text-sm text-gray-600 text-center mb-2">
        Total Progress: {Math.round(progress)}%
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-eco-primary h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};