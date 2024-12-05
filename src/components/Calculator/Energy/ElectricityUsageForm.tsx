import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const HOURS_OPTIONS = [
  { value: "24", label: "24 hours" },
  { value: "18-24", label: "18-24 hours" },
  { value: "12-18", label: "12-18 hours" },
  { value: "6-12", label: "6-12 hours" },
  { value: "<6", label: "Less than 6 hours" },
];

interface ElectricityUsageFormProps {
  values: {
    electricity: string;
    electricityHours: string;
    electricityDays: string;
    useExactElectricity?: boolean;
  };
  onChange: (field: string, value: string | boolean) => void;
}

export const ElectricityUsageForm = ({ values, onChange }: ElectricityUsageFormProps) => {
  const handleExactUsageChange = (checked: boolean) => {
    onChange("useExactElectricity", checked);
    if (checked) {
      onChange("electricityHours", "");
      onChange("electricityDays", "7");
    } else {
      onChange("electricity", "");
    }
  };

  const calculateEstimatedKwh = (hours: string, daysPerWeek: number) => {
    const averageHours = hours === "24" ? 24 : hours === "18-24" ? 21 : hours === "12-18" ? 15 : hours === "6-12" ? 9 : 3;
    const monthlyHours = (averageHours * daysPerWeek * 4.33);
    return Math.round(monthlyHours);
  };

  return (
    <div className="space-y-6">
      <div className={`space-y-4 ${values.useExactElectricity ? 'opacity-50 pointer-events-none' : ''}`}>
        <Label>How many hours of electricity do you typically have in a day?</Label>
        <Select 
          value={values.electricityHours}
          onValueChange={(value) => onChange("electricityHours", value)}
          disabled={values.useExactElectricity}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select hours" />
          </SelectTrigger>
          <SelectContent>
            {HOURS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={`space-y-4 ${values.useExactElectricity ? 'opacity-50 pointer-events-none' : ''}`}>
        <Label>How many days per week do you have electricity?</Label>
        <Slider
          value={[parseInt(values.electricityDays) || 7]}
          max={7}
          min={1}
          step={1}
          disabled={values.useExactElectricity}
          onValueChange={(value) => onChange("electricityDays", value[0].toString())}
        />
        <div className="text-sm text-muted-foreground text-center">
          {values.electricityDays || "7"} days
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-4 border-t">
        <Checkbox 
          id="exactUsage"
          checked={values.useExactElectricity}
          onCheckedChange={handleExactUsageChange}
          className="border-eco-primary data-[state=checked]:bg-eco-primary data-[state=checked]:text-primary-foreground"
        />
        <Label htmlFor="exactUsage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          I know my exact monthly electricity usage
        </Label>
      </div>

      <div className={`space-y-2 ${!values.useExactElectricity ? 'opacity-50 pointer-events-none' : ''}`}>
        <Label htmlFor="electricity" className="text-sm text-muted-foreground">
          Enter your monthly electricity usage (kWh):
        </Label>
        <Input
          id="electricity"
          type="number"
          placeholder="0"
          value={values.electricity}
          disabled={!values.useExactElectricity}
          onChange={(e) => onChange("electricity", e.target.value)}
        />
      </div>

      {!values.useExactElectricity && values.electricityHours && values.electricityDays && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm">
            Based on your usage pattern, your estimated monthly consumption is approximately{" "}
            <span className="font-semibold">
              {calculateEstimatedKwh(values.electricityHours, parseInt(values.electricityDays))} kWh
            </span>
          </p>
        </div>
      )}
    </div>
  );
};