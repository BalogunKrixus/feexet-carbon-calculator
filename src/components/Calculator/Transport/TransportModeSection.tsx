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
  const handleModeChange = (value: string) => {
    // If clicking the already selected mode, deselect it by setting to empty string
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
      
      <RadioGroup
        value={selectedMode}
        onValueChange={handleModeChange}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {TRANSPORT_MODES.map(({ value, label, Icon, tooltip }) => (
          <div key={value}>
            <RadioGroupItem
              value={value}
              id={value}
              className="peer sr-only"
            />
            <Label
              htmlFor={value}
              className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-transparent p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-eco-primary peer-data-[state=checked]:bg-eco-primary peer-data-[state=checked]:text-white [&:has([data-state=checked])]:border-eco-primary [&:has([data-state=checked])]:bg-eco-primary [&:has([data-state=checked])]:text-white cursor-pointer"
            >
              <Icon className="mb-2 h-6 w-6" />
              <span className="text-sm font-medium">{label}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};