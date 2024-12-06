import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { TransportOptions } from "./TransportOptions";
import { useTransportState } from "@/hooks/useTransportState";
import { calculateTransportDistances } from "@/utils/transportCalculations";

export const TransportSection = ({
  values,
  onChange,
}: {
  values: { carKm: string; busKm: string };
  onChange: (field: string, value: string) => void;
}) => {
  const {
    transportMode,
    frequency,
    carYear,
    flightFrequency,
    flightType,
    setTransportMode,
    setFrequency,
    setCarYear,
    setFlightFrequency,
    setFlightType
  } = useTransportState(onChange);

  useEffect(() => {
    // Reset all transport-related values when mode changes
    onChange("carKm", "0");
    onChange("busKm", "0");
    
    if (!transportMode) return;

    const { carKm, busKm } = calculateTransportDistances(transportMode, frequency);
    
    // Only set the relevant transport mode value
    if (transportMode === "car") {
      onChange("carKm", carKm.toString());
    } else if (transportMode === "public") {
      onChange("busKm", busKm.toString());
    }
    // For "bike" mode, both values remain 0

    onChange("carYear", carYear);
    onChange("flightFrequency", flightFrequency);
    onChange("flightType", flightType);

    console.log('Transport mode updated:', {
      mode: transportMode,
      frequency,
      carYear,
      carKm: transportMode === "car" ? carKm : 0,
      busKm: transportMode === "public" ? busKm : 0,
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