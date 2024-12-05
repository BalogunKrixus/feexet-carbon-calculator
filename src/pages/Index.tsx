import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TransportSection } from "@/components/Calculator/TransportSection";
import { EnergySection } from "@/components/Calculator/EnergySection";
import { WasteSection } from "@/components/Calculator/WasteSection";
import { Results } from "@/components/Calculator/Results";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Lightbulb, Trash2 } from "lucide-react";

const Index = () => {
  const [formData, setFormData] = useState({
    carKm: "",
    busKm: "",
    electricity: "",
    generator: "",
    waste: "",
    recycling: "",
    electricityHours: "",
    electricityDays: "7",
    generatorType: "",
    generatorHours: "4",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateEmissions = () => {
    // Transport emissions
    // Car: 0.14 kg CO2 per km (average Nigerian car)
    const carEmissions = Number(formData.carKm) * 0.14;
    // Bus: 0.082 kg CO2 per km per passenger (public transport)
    const busEmissions = Number(formData.busKm) * 0.082;

    // Energy emissions
    // Grid electricity: 0.43 kg CO2 per kWh (Nigerian grid factor)
    const electricityEmissions = Number(formData.electricity) * 0.43;
    // Generator: 2.68 kg CO2 per liter of diesel
    const generatorEmissions = Number(formData.generator) * 2.68;

    // Waste emissions
    // Landfill waste: 2.86 kg CO2e per kg waste
    const wasteEmissions = Number(formData.waste) * 52 * 2.86;
    // Recycling offset: -1.04 kg CO2e per kg recycled
    const recyclingOffset = Number(formData.recycling) * 52 * 1.04;

    // Convert to annual tons
    const transport = (carEmissions + busEmissions) * 12 / 1000;
    const energy = (electricityEmissions + generatorEmissions) * 12 / 1000;
    const waste = (wasteEmissions - recyclingOffset) / 1000;

    return {
      total: transport + energy + waste,
      breakdown: [
        { category: "Transport", value: transport },
        { category: "Energy", value: energy },
        { category: "Waste", value: waste },
      ],
    };
  };

  const results = calculateEmissions();

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-light to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/80 z-10" />
          <img
            src="/lovable-uploads/b035a820-5d42-40d3-8956-4d2870f7ccf9.png"
            alt="Busy Nigerian street with yellow buses and crowds"
            className="w-full h-[600px] object-cover"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 animate-fade-in drop-shadow-lg">
            Nigeria's Most Accurate Carbon Footprint Calculator
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-12 animate-fade-in drop-shadow-md">
            Understanding your carbon footprint is the first step towards a sustainable future. Our intuitive calculator provides precise measurements tailored to Nigerian lifestyle and infrastructure.
          </p>
          <Button 
            className="bg-eco-primary hover:bg-eco-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
            onClick={() => {
              const calculatorSection = document.getElementById('calculator');
              calculatorSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Calculate Your Footprint
          </Button>
        </div>
      </div>

      {/* Calculator Section */}
      <div id="calculator" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-title mb-4">
            Carbon Footprint Calculator
          </h2>
          <p className="text-gray-600">
            Measure your environmental impact and discover ways to reduce your carbon footprint
          </p>
        </div>

        <div className="space-y-6 animate-fade-in">
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
              <TransportSection values={formData} onChange={handleChange} />
            </TabsContent>
            <TabsContent value="energy">
              <EnergySection values={formData} onChange={handleChange} />
            </TabsContent>
            <TabsContent value="waste">
              <WasteSection values={formData} onChange={handleChange} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="animate-fade-in">
          <Results
            totalEmissions={results.total}
            breakdown={results.breakdown}
          />
        </div>

        <div className="text-center space-y-4 animate-fade-in">
          <Button
            className="bg-eco-primary hover:bg-eco-primary/90 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setFormData({
              carKm: "",
              busKm: "",
              electricity: "",
              generator: "",
              waste: "",
              recycling: "",
              electricityHours: "",
              electricityDays: "7",
              generatorType: "",
              generatorHours: "4",
            })}
          >
            Reset Calculator
          </Button>
          <p className="text-sm text-gray-600">
            * This calculator provides estimates based on average emission factors in Nigeria
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;