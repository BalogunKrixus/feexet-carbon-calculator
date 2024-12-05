import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const WasteSection = ({
  values,
  onChange,
}: {
  values: { waste: string; recycling: string };
  onChange: (field: string, value: string) => void;
}) => {
  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-xl font-semibold text-eco-primary">Waste Management</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="waste">Weekly household waste (kg)</Label>
          <Input
            id="waste"
            type="number"
            placeholder="0"
            value={values.waste}
            onChange={(e) => onChange("waste", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="recycling">Weekly recycling (kg)</Label>
          <Input
            id="recycling"
            type="number"
            placeholder="0"
            value={values.recycling}
            onChange={(e) => onChange("recycling", e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
};