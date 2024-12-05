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
    if (!transportMode) {
      onChange("carKm", "0");
      onChange("busKm", "0");
      return;
    }

    const { carKm, busKm } = calculateTransportDistances(transportMode, frequency);
    
    onChange("carKm", carKm.toString());
    onChange("busKm", busKm.toString());
    onChange("carYear", carYear);
    onChange("flightFrequency", flightFrequency);
    onChange("flightType", flightType);

    console.log('Transport mode updated:', {
      mode: transportMode,
      frequency,
      carYear,
      carKm,
      busKm,
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