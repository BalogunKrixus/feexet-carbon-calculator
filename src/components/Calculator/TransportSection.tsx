import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const TransportSection = ({
  values,
  onChange,
}: {
  values: { carKm: string; busKm: string };
  onChange: (field: string, value: string) => void;
}) => {
  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-xl font-semibold text-eco-primary">Transportation</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="carKm">Monthly car travel (kilometers)</Label>
          <Input
            id="carKm"
            type="number"
            placeholder="0"
            value={values.carKm}
            onChange={(e) => onChange("carKm", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="busKm">Monthly bus travel (kilometers)</Label>
          <Input
            id="busKm"
            type="number"
            placeholder="0"
            value={values.busKm}
            onChange={(e) => onChange("busKm", e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
};