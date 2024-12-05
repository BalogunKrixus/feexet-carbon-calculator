import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const GENERATOR_TYPES = [
  { value: "small", label: "Small (< 2.5 KVA)", consumption: 0.7 },
  { value: "medium", label: "Medium (2.5-5 KVA)", consumption: 1.2 },
  { value: "large", label: "Large (> 5 KVA)", consumption: 2.0 },
];

interface GeneratorUsageFormProps {
  values: {
    generator: string;
    generatorType: string;
    generatorHours: string;
  };
  onChange: (field: string, value: string) => void;
}

export const GeneratorUsageForm = ({ values, onChange }: GeneratorUsageFormProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>What type of generator do you use?</Label>
        <Select onValueChange={(value) => onChange("generatorType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select generator type" />
          </SelectTrigger>
          <SelectContent>
            {GENERATOR_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>How many hours do you run your generator daily?</Label>
        <Slider
          defaultValue={[0]}
          max={24}
          min={0}
          step={1}
          onValueChange={(value) => onChange("generatorHours", value[0].toString())}
        />
        <div className="text-sm text-muted-foreground text-center">
          {values.generatorHours || "0"} hours
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="generator">Monthly generator fuel consumption (liters)</Label>
        <Input
          id="generator"
          type="number"
          placeholder="0"
          value={values.generator}
          onChange={(e) => onChange("generator", e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Most households with a medium generator use about 5 liters/day if run for 5 hours
        </p>
      </div>

      {values.generatorType && values.generatorHours && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm">
            Based on your generator type and usage, your estimated monthly fuel consumption is approximately{" "}
            <span className="font-semibold">
              {Math.round(
                GENERATOR_TYPES.find((t) => t.value === values.generatorType)!.consumption *
                  parseInt(values.generatorHours) *
                  30
              )}{" "}
              liters
            </span>
          </p>
        </div>
      )}
    </div>
  );
};