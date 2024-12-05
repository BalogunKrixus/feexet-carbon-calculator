import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TransportSection } from "@/components/Calculator/TransportSection";
import { EnergySection } from "@/components/Calculator/EnergySection";
import { WasteSection } from "@/components/Calculator/WasteSection";
import { Results } from "@/components/Calculator/Results";

const Index = () => {
  const [formData, setFormData] = useState({
    carKm: "",
    busKm: "",
    electricity: "",
    generator: "",
    waste: "",
    recycling: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateEmissions = () => {
    // Simplified emission factors for demonstration
    const carEmissions = Number(formData.carKm) * 0.2; // kg CO2 per km
    const busEmissions = Number(formData.busKm) * 0.1; // kg CO2 per km
    const electricityEmissions = Number(formData.electricity) * 0.5; // kg CO2 per kWh
    const generatorEmissions = Number(formData.generator) * 2.7; // kg CO2 per liter
    const wasteEmissions = Number(formData.waste) * 52 * 0.5; // kg CO2 per kg waste per year
    const recyclingOffset = Number(formData.recycling) * 52 * 0.1; // kg CO2 saved per kg recycled per year

    const transport = (carEmissions + busEmissions) * 12 / 1000; // Convert to tons per year
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
    <div className="min-h-screen bg-eco-light py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold text-eco-primary sm:text-4xl">
            Nigeria Carbon Footprint Calculator
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Measure your environmental impact and discover ways to reduce your carbon footprint
          </p>
        </div>

        <div className="space-y-6 animate-fade-in">
          <TransportSection values={formData} onChange={handleChange} />
          <EnergySection values={formData} onChange={handleChange} />
          <WasteSection values={formData} onChange={handleChange} />
        </div>

        <div className="animate-fade-in">
          <Results
            totalEmissions={results.total}
            breakdown={results.breakdown}
          />
        </div>

        <div className="text-center space-y-4 animate-fade-in">
          <Button
            className="bg-eco-primary hover:bg-eco-primary/90"
            size="lg"
            onClick={() => setFormData({
              carKm: "",
              busKm: "",
              electricity: "",
              generator: "",
              waste: "",
              recycling: "",
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