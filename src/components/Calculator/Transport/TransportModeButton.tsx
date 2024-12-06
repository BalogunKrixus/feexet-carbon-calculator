import { TransportMode } from './types';

interface TransportModeButtonProps {
  mode: TransportMode;
  isSelected: boolean;
  onClick: () => void;
}

export const TransportModeButton = ({
  mode,
  isSelected,
  onClick,
}: TransportModeButtonProps) => {
  const { Icon, label } = mode;
  
  return (
    <div>
      <button
        onClick={onClick}
        className={`w-full flex flex-col items-center justify-center rounded-lg border-2 p-6 transition-all duration-200 ${
          isSelected
            ? "border-eco-primary bg-eco-primary text-white hover:bg-eco-primary/90"
            : "border-muted bg-transparent hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        <Icon className={`mb-2 h-6 w-6 ${isSelected ? "text-white" : ""}`} />
        <span className={`text-sm font-medium ${isSelected ? "text-white" : ""}`}>
          {label}
        </span>
      </button>
    </div>
  );
};