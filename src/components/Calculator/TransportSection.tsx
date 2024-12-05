import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { TransportOptions } from "./TransportOptions";

const FREQUENCY_MULTIPLIERS = {
  daily: 30,
  weekdays: 20,
  weekends: 8,
  few_times: 12,
  once_week: 4,
  monthly: 1.5,
  rarely: 0.5,
};

const BASE_DISTANCES = {
  car: 500,
  public: 300,
  bike: 100,
};

export const TransportSection = ({
  values,
  onChange,
}: {
  values: { carKm: string; busKm: string };
  onChange: (field: string, value: string) => void;
}) => {
  const [transportMode, setTransportMode] = useState("");
  const [frequency, setFrequency] = useState("monthly");

  useEffect(() => {
    const handleReset = () => {
      setTransportMode("");
      setFrequency("monthly");
    };

    window.addEventListener('reset', handleReset);
    return () => window.removeEventListener('reset', handleReset);
  }, []);

  useEffect(() => {
    if (!transportMode) {
      onChange("carKm", "0");
      onChange("busKm", "0");
      return;
    }

    const baseDistance = BASE_DISTANCES[transportMode as keyof typeof BASE_DISTANCES] || 0;
    const multiplier = FREQUENCY_MULTIPLIERS[frequency as keyof typeof FREQUENCY_MULTIPLIERS];
    const estimatedDistance = baseDistance * multiplier;

    switch (transportMode) {
      case "car":
        onChange("carKm", estimatedDistance.toString());
        onChange("busKm", "0");
        break;
      case "public":
        onChange("busKm", estimatedDistance.toString());
        onChange("carKm", "0");
        break;
      case "bike":
        // For bike/walking, set both to 0 as they don't produce emissions
        onChange("carKm", "0");
        onChange("busKm", "0");
        break;
      default:
        onChange("carKm", "0");
        onChange("busKm", "0");
    }

    console.log('Transport mode updated:', {
      mode: transportMode,
      frequency,
      estimatedDistance,
    });
  }, [transportMode, frequency, onChange]);

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-xl font-semibold text-title">Transportation</h3>
      <TransportOptions
        selectedMode={transportMode}
        selectedFrequency={frequency}
        onModeChange={setTransportMode}
        onFrequencyChange={setFrequency}
      />
    </Card>
  );
};