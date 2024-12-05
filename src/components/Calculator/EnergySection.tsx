import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Lightbulb, Fuel } from "lucide-react";

const HOURS_OPTIONS = [
  { value: "24", label: "24 hours" },
  { value: "18-24", label: "18-24 hours" },
  { value: "12-18", label: "12-18 hours" },
  { value: "6-12", label: "6-12 hours" },
  { value: "<6", label: "Less than 6 hours" },
];

const GENERATOR_TYPES = [
  { value: "small", label: "Small (< 2.5 KVA)", consumption: 0.7 },
  { value: "medium", label: "Medium (2.5-5 KVA)", consumption: 1.2 },
  { value: "large", label: "Large (> 5 KVA)", consumption: 2.0 },
];

interface EnergyValues {
  electricity: string;
  generator: string;
  electricityHours: string;
  electricityDays: string;
  generatorType: string;
  generatorHours: string;
}

export const EnergySection = ({
  values,
  onChange,
}: {
  values: EnergyValues;
  onChange: (field: string, value: string) => void;
}) => {
  const calculateEstimatedKwh = (hours: string, daysPerWeek: number) => {
    const averageHours = hours === "24" ? 24 : hours === "18-24" ? 21 : hours === "12-18" ? 15 : hours === "6-12" ? 9 : 3;
    const monthlyHours = (averageHours * daysPerWeek * 4.33);
    // Assuming average household consumption of 1kW per hour
    return Math.round(monthlyHours);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="electricity" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="electricity">Electricity Usage</TabsTrigger>
          <TabsTrigger value="generator">Generator Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="electricity">
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-6 w-6 text-eco-primary" />
              <h3 className="text-xl font-semibold text-title">Electricity Usage</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label>How many hours of electricity do you typically have in a day?</Label>
                <Select onValueChange={(value) => onChange("electricityHours", value)}>
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

              <div className="space-y-4">
                <Label>How many days per week do you have electricity?</Label>
                <Slider
                  defaultValue={[7]}
                  max={7}
                  min={1}
                  step={1}
                  onValueChange={(value) => onChange("electricityDays", value[0].toString())}
                />
                <div className="text-sm text-muted-foreground text-center">
                  {values.electricityDays || "7"} days
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="electricity" className="text-sm text-muted-foreground">
                  If you know your monthly electricity usage (kWh), enter it below:
                </Label>
                <Input
                  id="electricity"
                  type="number"
                  placeholder="0"
                  value={values.electricity}
                  onChange={(e) => onChange("electricity", e.target.value)}
                />
              </div>

              {values.electricityHours && values.electricityDays && (
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
          </Card>
        </TabsContent>

        <TabsContent value="generator">
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Fuel className="h-6 w-6 text-eco-primary" />
              <h3 className="text-xl font-semibold text-title">Generator Usage</h3>
            </div>

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
                  defaultValue={[4]}
                  max={24}
                  min={0}
                  step={1}
                  onValueChange={(value) => onChange("generatorHours", value[0].toString())}
                />
                <div className="text-sm text-muted-foreground text-center">
                  {values.generatorHours || "4"} hours
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
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};