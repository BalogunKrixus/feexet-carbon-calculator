import { Card } from "@/components/ui/card";
import { Lightbulb, Fuel } from "lucide-react";
import { ElectricityUsageForm } from "./Energy/ElectricityUsageForm";
import { GeneratorUsageForm } from "./Energy/GeneratorUsageForm";

interface EnergyValues {
  electricity: string;
  generator: string;
  electricityHours: string;
  electricityDays: string;
  generatorType: string;
  generatorHours: string;
  useExactElectricity?: boolean;
}

export const EnergySection = ({
  values,
  onChange,
}: {
  values: EnergyValues;
  onChange: (field: string, value: string | boolean) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-eco-primary" />
          <h3 className="text-xl font-semibold text-title">Electricity Usage</h3>
        </div>
        <ElectricityUsageForm values={values} onChange={onChange} />
      </Card>

      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Fuel className="h-6 w-6 text-eco-primary" />
          <h3 className="text-xl font-semibold text-title">Generator Usage</h3>
        </div>
        <GeneratorUsageForm values={values} onChange={onChange} />
      </Card>
    </div>
  );
};