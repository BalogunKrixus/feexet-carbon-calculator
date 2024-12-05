import { Car, Lightbulb, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransportSection } from "./TransportSection";
import { EnergySection } from "./EnergySection";
import { WasteSection } from "./WasteSection";

interface CalculatorTabsProps {
  values: {
    carKm: string;
    busKm: string;
    electricity: string;
    generator: string;
    waste: string;
    recycling: string;
    electricityHours: string;
    electricityDays: string;
    generatorType: string;
    generatorHours: string;
    useExactElectricity: boolean;
  };
  onChange: (field: string, value: string | boolean) => void;
}

export const CalculatorTabs = ({ values, onChange }: CalculatorTabsProps) => {
  return (
    <Tabs defaultValue="transport" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger 
          value="transport" 
          className="flex items-center gap-2 data-[state=active]:bg-eco-primary data-[state=active]:text-white"
        >
          <Car className="h-4 w-4" />
          Transport
        </TabsTrigger>
        <TabsTrigger 
          value="energy" 
          className="flex items-center gap-2 data-[state=active]:bg-eco-primary data-[state=active]:text-white"
        >
          <Lightbulb className="h-4 w-4" />
          Energy
        </TabsTrigger>
        <TabsTrigger 
          value="waste" 
          className="flex items-center gap-2 data-[state=active]:bg-eco-primary data-[state=active]:text-white"
        >
          <Trash2 className="h-4 w-4" />
          Waste
        </TabsTrigger>
      </TabsList>
      <TabsContent value="transport">
        <TransportSection values={values} onChange={onChange} />
      </TabsContent>
      <TabsContent value="energy">
        <EnergySection values={values} onChange={onChange} />
      </TabsContent>
      <TabsContent value="waste">
        <WasteSection values={values} onChange={onChange} />
      </TabsContent>
    </Tabs>
  );
};