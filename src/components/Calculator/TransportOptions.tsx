import { Car, Bus, Bike, Info } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FREQUENCY_OPTIONS = [
  { value: "daily", label: "Daily (7 days/week)", multiplier: 30 },
  { value: "weekdays", label: "Weekdays only (Monday to Friday)", multiplier: 20 },
  { value: "weekends", label: "Weekends only (Saturday and Sunday)", multiplier: 8 },
  { value: "few_times", label: "Few times a week (e.g., 2–4 days/week)", multiplier: 12 },
  { value: "once_week", label: "Once a week", multiplier: 4 },
  { value: "monthly", label: "Once or twice a month", multiplier: 1.5 },
  { value: "rarely", label: "Rarely (less than once a month)", multiplier: 0.5 },
];

const TRANSPORT_MODES = [
  { 
    value: "car", 
    label: "Car (Petrol)", 
    icon: Car, 
    baseDistance: 500,
    tooltip: "Average car travels 500 km/month in urban Nigeria" 
  },
  { 
    value: "bus", 
    label: "Public Bus", 
    icon: Bus, 
    baseDistance: 300,
    tooltip: "Typical monthly commute distance by public transport" 
  },
  { 
    value: "bike", 
    label: "Bicycle/Walking", 
    icon: Bike, 
    baseDistance: 100,
    tooltip: "Eco-friendly option with zero emissions" 
  },
];

export const TransportOptions = ({
  selectedMode,
  selectedFrequency,
  onModeChange,
  onFrequencyChange,
}: {
  selectedMode: string;
  selectedFrequency: string;
  onModeChange: (value: string) => void;
  onFrequencyChange: (value: string) => void;
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">How do you commute most often?</Label>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="max-w-xs">Select your primary mode of transportation for daily activities. This helps us calculate your carbon footprint based on typical Nigerian commuting patterns.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <RadioGroup
          value={selectedMode}
          onValueChange={onModeChange}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {TRANSPORT_MODES.map((mode) => {
            const Icon = mode.icon;
            return (
              <div key={mode.value}>
                <RadioGroupItem
                  value={mode.value}
                  id={mode.value}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={mode.value}
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-eco-primary peer-data-[state=checked]:bg-eco-primary peer-data-[state=checked]:text-white [&:has([data-state=checked])]:border-eco-primary [&:has([data-state=checked])]:bg-eco-primary [&:has([data-state=checked])]:text-white cursor-pointer"
                >
                  <Icon className="mb-2 h-6 w-6" />
                  <span className="text-sm font-medium">{mode.label}</span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">How often do you travel?</Label>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="max-w-xs">Choose your travel frequency to help us estimate your monthly travel distance. For example, selecting 'Daily' means you commute every day, while 'Rarely' might mean occasional trips.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Select value={selectedFrequency} onValueChange={onFrequencyChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            {FREQUENCY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};