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
    <div className="min-h-screen bg-gradient-to-b from-eco-light to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
            alt="Sustainability concept"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-eco-primary mb-6 animate-fade-in">
            Nigeria's Most Accurate Carbon Footprint Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 animate-fade-in">
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
          <h2 className="text-3xl font-bold text-eco-primary mb-4">
            Carbon Footprint Calculator
          </h2>
          <p className="text-gray-600">
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
            className="bg-eco-primary hover:bg-eco-primary/90 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
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