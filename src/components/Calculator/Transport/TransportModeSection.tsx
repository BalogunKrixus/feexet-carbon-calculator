import { Car, Bus, Bike } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const TRANSPORT_MODES = [
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
  console.log("Current selected mode:", selectedMode); // Debug log

  const handleModeChange = (value: string) => {
    console.log("Handling mode change:", { value, currentSelected: selectedMode }); // Debug log
    if (value === selectedMode) {
      console.log("Deselecting mode"); // Debug log
      onModeChange("");
    } else {
      console.log("Selecting new mode:", value); // Debug log
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
        {TRANSPORT_MODES.map(({ value, label, Icon, tooltip }) => (
          <div key={value}>
            <button
              onClick={() => handleModeChange(value)}
              className={`w-full flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-transparent p-6 hover:bg-accent hover:text-accent-foreground transition-colors ${
                selectedMode === value
                  ? "border-eco-primary bg-eco-primary text-white"
                  : ""
              }`}
            >
              <Icon className="mb-2 h-6 w-6" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};