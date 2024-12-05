import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Results } from "@/components/Calculator/Results";
import { HeroSection } from "@/components/Calculator/HeroSection";
import { CalculatorTabs } from "@/components/Calculator/CalculatorTabs";

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
    useExactElectricity: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateEmissions = () => {
    // Transport emissions
    const carEmissions = Number(formData.carKm) * 0.14;
    const busEmissions = Number(formData.busKm) * 0.082;

    // Energy emissions
    let electricityEmissions = 0;
    
    if (formData.useExactElectricity) {
      // If user provided exact monthly usage
      electricityEmissions = Number(formData.electricity) * 0.43;
    } else if (formData.electricityHours) {
      // Calculate based on usage pattern
      const averageHours = formData.electricityHours === "24" ? 24 
        : formData.electricityHours === "18-24" ? 21 
        : formData.electricityHours === "12-18" ? 15 
        : formData.electricityHours === "6-12" ? 9 
        : 3;
      
      const daysPerWeek = Number(formData.electricityDays);
      const monthlyHours = (averageHours * daysPerWeek * 4.33);
      // Assuming average household consumption of 1.5 kWh per hour
      electricityEmissions = monthlyHours * 1.5 * 0.43;
    }

    // Generator emissions (2.68 kg CO2 per liter of diesel)
    const generatorEmissions = Number(formData.generator) * 2.68;

    // Waste emissions
    const wasteEmissions = Number(formData.waste) * 52 * 2.86;
    const recyclingOffset = Number(formData.recycling) * 52 * 1.04;

    // Convert to annual tons
    const transport = (carEmissions + busEmissions) * 12 / 1000;
    const energy = (electricityEmissions + generatorEmissions) * 12 / 1000;
    const waste = (wasteEmissions - recyclingOffset) / 1000;

    console.log('Electricity Emissions (monthly):', electricityEmissions);
    console.log('Energy Total (annual tons):', energy);

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
      <HeroSection />
      
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
          <CalculatorTabs values={formData} onChange={handleChange} />
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
              useExactElectricity: false,
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