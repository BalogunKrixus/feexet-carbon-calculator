import { Car, Bus, Bike, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TransportMode {
  value: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;  // Updated to accept className prop
  baseDistance: number;
  tooltip: string;
}

const TRANSPORT_MODES: TransportMode[] = [
  { 
    value: "car", 
    label: "Car (Fuel)", 
    Icon: Car,
    baseDistance: 500,
    tooltip: "Average car travels 500 km/month in urban Nigeria" 
  },
  { 
    value: "public", 
    label: "Public Transport", 
    Icon: Bus,
    baseDistance: 300,
    tooltip: "Public transportation options in Nigeria" 
  },
  { 
    value: "bike", 
    label: "Bicycle/Walking", 
    Icon: Bike,
    baseDistance: 100,
    tooltip: "Eco-friendly option with zero emissions" 
  },
];

interface TransportModeSectionProps {
  selectedMode: string;
  onModeChange: (value: string) => void;
}

export const TransportModeSection = ({
  selectedMode,
  onModeChange,
}: TransportModeSectionProps) => {
  const handleModeChange = (value: string) => {
    if (value === selectedMode) {
      onModeChange("");
    } else {
      onModeChange(value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">
          How do you commute most often?
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                type="button" 
                className="cursor-help focus:outline-none focus:ring-2 focus:ring-eco-primary focus:ring-offset-2 rounded-full"
              >
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent 
              side="top"
              sideOffset={5}
              className="touch-none"
            >
              <p className="max-w-xs">
                Select your primary mode of transportation for daily activities. 
                This helps us calculate your carbon footprint based on typical 
                Nigerian commuting patterns.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TRANSPORT_MODES.map(({ value, label, Icon }) => (
          <div key={value}>
            <button
              onClick={() => handleModeChange(value)}
              className={`w-full flex flex-col items-center justify-center rounded-lg border-2 p-6 transition-all duration-200 ${
                selectedMode === value
                  ? "border-eco-primary bg-eco-primary text-white hover:bg-eco-primary/90"
                  : "border-muted bg-transparent hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon className={`mb-2 h-6 w-6 ${selectedMode === value ? "text-white" : ""}`} />
              <span className={`text-sm font-medium ${selectedMode === value ? "text-white" : ""}`}>
                {label}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};