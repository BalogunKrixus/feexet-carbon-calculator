import { Car, Bus, Bike, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TRANSPORT_MODES = [
  {
    value: "car",
    label: "Car (Fuel)",
    icon: Car,
    tooltip: "Average car travels 500 km/month in urban Nigeria",
  },
  {
    value: "public",
    label: "Public Transport",
    icon: Bus,
    tooltip: "Public transportation options in Nigeria",
  },
  {
    value: "bike",
    label: "Bicycle/Walking",
    icon: Bike,
    tooltip: "Eco-friendly option with zero emissions",
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
            <TooltipContent side="top" sideOffset={5} className="touch-none">
              <p className="max-w-xs">
                Select your primary mode of transportation for daily activities.
                This helps us calculate your carbon footprint based on typical
                Nigerian commuting patterns.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <ToggleGroup
        type="single"
        value={selectedMode}
        onValueChange={handleModeChange}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {TRANSPORT_MODES.map(({ value, label, icon: IconComponent, tooltip }) => (
          <ToggleGroupItem
            key={value}
            value={value}
            aria-label={label}
            className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-muted bg-transparent p-8 hover:bg-accent hover:text-accent-foreground data-[state=on]:border-eco-primary data-[state=on]:bg-eco-primary data-[state=on]:text-white"
          >
            <IconComponent className="h-8 w-8" />
            <span className="text-sm font-medium">{label}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};