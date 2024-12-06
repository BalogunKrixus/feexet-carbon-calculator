import { Car, Bus, Bike } from "lucide-react";
import { TransportModeButton } from "./TransportModeButton";
import { TransportModeHeader } from "./TransportModeHeader";
import { TransportMode } from "./types";

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
      <TransportModeHeader />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TRANSPORT_MODES.map((mode) => (
          <TransportModeButton
            key={mode.value}
            mode={mode}
            isSelected={selectedMode === mode.value}
            onClick={() => handleModeChange(mode.value)}
          />
        ))}
      </div>
    </div>
  );
};