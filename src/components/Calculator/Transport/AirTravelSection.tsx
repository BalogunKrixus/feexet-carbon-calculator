import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AirTravelProps {
  flightFrequency: string;
  flightType: string;
  onFlightFrequencyChange: (value: string) => void;
  onFlightTypeChange: (value: string) => void;
}

const FLIGHT_FREQUENCIES = [
  { value: "none", label: "No flights" },
  { value: "rare", label: "1-2 flights per year" },
  { value: "occasional", label: "3-5 flights per year" },
  { value: "frequent", label: "6+ flights per year" },
];

export const AirTravelSection = ({
  flightFrequency,
  flightType,
  onFlightFrequencyChange,
  onFlightTypeChange,
}: AirTravelProps) => {
  return (
    <div className="space-y-6 border-t pt-6">
      <Label className="text-base font-semibold">Air Travel</Label>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>How often do you fly?</Label>
          <Select value={flightFrequency} onValueChange={onFlightFrequencyChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select flight frequency" />
            </SelectTrigger>
            <SelectContent>
              {FLIGHT_FREQUENCIES.map((freq) => (
                <SelectItem key={freq.value} value={freq.value}>
                  {freq.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {flightFrequency !== "none" && (
          <div className="space-y-2">
            <Label>What type of flights do you usually take?</Label>
            <Select value={flightType} onValueChange={onFlightTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select flight type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="domestic">Domestic Flights</SelectItem>
                <SelectItem value="international">International Flights</SelectItem>
                <SelectItem value="both">Both Domestic and International</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};