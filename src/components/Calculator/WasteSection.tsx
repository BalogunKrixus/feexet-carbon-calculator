import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const WasteSection = ({
  values,
  onChange,
}: {
  values: { waste: string; recycling: string };
  onChange: (field: string, value: string) => void;
}) => {
  const wasteBagOptions = [
    { label: "Small (1-2 bags/week)", value: "2", kg: "10" },
    { label: "Medium (3-4 bags/week)", value: "4", kg: "20" },
    { label: "Large (5+ bags/week)", value: "6", kg: "30" },
  ];

  const handleBagSelection = (value: string) => {
    const selectedOption = wasteBagOptions.find(opt => opt.value === value);
    if (selectedOption) {
      onChange("waste", selectedOption.kg);
    }
  };

  const handleRecyclingPercentage = (value: number[]) => {
    const percentage = value[0];
    const wasteKg = Number(values.waste) || 0;
    const recyclingKg = (wasteKg * percentage) / 100;
    onChange("recycling", recyclingKg.toString());
  };

  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-xl font-semibold text-title">Waste Management</h3>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>How many bags of waste do you produce weekly?</Label>
          <RadioGroup
            onValueChange={handleBagSelection}
            defaultValue={wasteBagOptions.find(
              opt => Number(opt.kg) === Number(values.waste)
            )?.value}
            className="grid gap-4"
          >
            {wasteBagOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`bags-${option.value}`} />
                <Label htmlFor={`bags-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label>What percentage of your waste is recycled?</Label>
          <div className="px-2">
            <Slider
              defaultValue={[Number(values.recycling) / Number(values.waste) * 100 || 0]}
              max={100}
              step={25}
              onValueChange={handleRecyclingPercentage}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 w-full justify-between">
              <span>I know the exact weights</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-4">
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
          </CollapsibleContent>
        </Collapsible>
      </div>
    </Card>
  );
};