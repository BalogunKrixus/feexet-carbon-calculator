import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { TransportOptions } from "./TransportOptions";

const FREQUENCY_MULTIPLIERS = {
  daily: 30,
  weekly: 4,
  monthly: 1,
  rarely: 0.5,
};

const BASE_DISTANCES = {
  car: 500,
  bus: 300,
  bike: 100,
};

export const TransportSection = ({
  values,
  onChange,
}: {
  values: { carKm: string; busKm: string };
  onChange: (field: string, value: string) => void;
}) => {
  const [transportMode, setTransportMode] = useState("car");
  const [frequency, setFrequency] = useState("monthly");

  useEffect(() => {
    const baseDistance = BASE_DISTANCES[transportMode as keyof typeof BASE_DISTANCES];
    const multiplier = FREQUENCY_MULTIPLIERS[frequency as keyof typeof FREQUENCY_MULTIPLIERS];
    const estimatedDistance = baseDistance * multiplier;

    if (transportMode === "car") {
      onChange("carKm", estimatedDistance.toString());
      onChange("busKm", "0");
    } else if (transportMode === "bus") {
      onChange("busKm", estimatedDistance.toString());
      onChange("carKm", "0");
    } else {
      onChange("carKm", "0");
      onChange("busKm", "0");
    }
  }, [transportMode, frequency, onChange]);

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-xl font-semibold text-eco-primary">Transportation</h3>
      <TransportOptions
        selectedMode={transportMode}
        selectedFrequency={frequency}
        onModeChange={setTransportMode}
        onFrequencyChange={setFrequency}
      />
    </Card>
  );
};