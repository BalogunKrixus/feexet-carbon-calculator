import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const EnergySection = ({
  values,
  onChange,
}: {
  values: { electricity: string; generator: string };
  onChange: (field: string, value: string) => void;
}) => {
  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-xl font-semibold text-title">Home Energy</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="electricity">Monthly electricity usage (kWh)</Label>
          <Input
            id="electricity"
            type="number"
            placeholder="0"
            value={values.electricity}
            onChange={(e) => onChange("electricity", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="generator">Monthly generator fuel (liters)</Label>
          <Input
            id="generator"
            type="number"
            placeholder="0"
            value={values.generator}
            onChange={(e) => onChange("generator", e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
};