import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransportModeSection } from "./Transport/TransportModeSection";
import { AirTravelSection } from "./Transport/AirTravelSection";

const FREQUENCY_OPTIONS = [
  { value: "daily", label: "Daily (7 days/week)", multiplier: 30 },
  { value: "weekdays", label: "Weekdays only (Monday to Friday)", multiplier: 20 },
  { value: "weekends", label: "Weekends only (Saturday and Sunday)", multiplier: 8 },
  { value: "few_times", label: "Few times a week (e.g., 2–4 days/week)", multiplier: 12 },
  { value: "once_week", label: "Once a week", multiplier: 4 },
  { value: "monthly", label: "Once or twice a month", multiplier: 1.5 },
  { value: "rarely", label: "Rarely (less than once a month)", multiplier: 0.5 },
];

const CAR_YEARS = [
  { value: "new", label: "2020 or newer" },
  { value: "recent", label: "2015-2019" },
  { value: "older", label: "2010-2014" },
  { value: "old", label: "Before 2010" },
];

const PUBLIC_TRANSPORT_TYPES = [
  { value: "bus", label: "Bus" },
  { value: "train", label: "Train" },
  { value: "keke", label: "Keke Napep" },
  { value: "okada", label: "Okada" },
];

interface TransportOptionsProps {
  selectedMode: string;
  selectedFrequency: string;
  onModeChange: (value: string) => void;
  onFrequencyChange: (value: string) => void;
}

export const TransportOptions = ({
  selectedMode,
  selectedFrequency,
  onModeChange,
  onFrequencyChange,
}: TransportOptionsProps) => {
  const [carYear, setCarYear] = useState("");
  const [publicType, setPublicType] = useState("");
  const [flightFrequency, setFlightFrequency] = useState("none");
  const [flightType, setFlightType] = useState("domestic");

  return (
    <div className="space-y-6">
      <TransportModeSection 
        selectedMode={selectedMode}
        onModeChange={onModeChange}
      />

      {selectedMode === "car" && (
        <div className="space-y-4">
          <Label className="text-base font-semibold">What's the model year of your vehicle?</Label>
          <Select value={carYear} onValueChange={setCarYear}>
            <SelectTrigger>
              <SelectValue placeholder="Select vehicle year" />
            </SelectTrigger>
            <SelectContent>
              {CAR_YEARS.map((year) => (
                <SelectItem key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedMode === "public" && (
        <div className="space-y-4">
          <Label className="text-base font-semibold">What type of public transport do you use?</Label>
          <Select value={publicType} onValueChange={setPublicType}>
            <SelectTrigger>
              <SelectValue placeholder="Select transport type" />
            </SelectTrigger>
            <SelectContent>
              {PUBLIC_TRANSPORT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-4">
        <Label className="text-base font-semibold">How often do you commute?</Label>
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

      <AirTravelSection
        flightFrequency={flightFrequency}
        flightType={flightType}
        onFlightFrequencyChange={setFlightFrequency}
        onFlightTypeChange={setFlightType}
      />
    </div>
  );
};