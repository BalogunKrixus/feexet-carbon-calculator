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
  const [carYear, setCarYear] = useState("");
  const [flightFrequency, setFlightFrequency] = useState("none");
  const [flightType, setFlightType] = useState("domestic");

  useEffect(() => {
    const handleReset = () => {
      setTransportMode("");
      setFrequency("monthly");
      setCarYear("");
      setFlightFrequency("none");
      setFlightType("domestic");
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
        onChange("carKm", "0");
        onChange("busKm", "0");
        break;
      default:
        onChange("carKm", "0");
        onChange("busKm", "0");
    }

    // Pass car year to parent
    onChange("carYear", carYear);
    // Pass flight data to parent
    onChange("flightFrequency", flightFrequency);
    onChange("flightType", flightType);

    console.log('Transport mode updated:', {
      mode: transportMode,
      frequency,
      carYear,
      estimatedDistance,
      flightData: {
        frequency: flightFrequency,
        type: flightType
      }
    });
  }, [transportMode, frequency, carYear, flightFrequency, flightType, onChange]);

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-xl font-semibold text-title">Transportation</h3>
      <TransportOptions
        selectedMode={transportMode}
        selectedFrequency={frequency}
        selectedCarYear={carYear}
        flightFrequency={flightFrequency}
        flightType={flightType}
        onModeChange={setTransportMode}
        onFrequencyChange={setFrequency}
        onCarYearChange={setCarYear}
        onFlightFrequencyChange={setFlightFrequency}
        onFlightTypeChange={setFlightType}
      />
    </Card>
  );
};