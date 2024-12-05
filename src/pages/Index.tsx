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
    electricityDays: "1",
    generatorType: "",
    generatorHours: "4",
    useExactElectricity: false,
  });

  const calculateEmissions = () => {
    // Transport emissions (updated with more accurate factors)
    const carEmissions = Number(formData.carKm) * 0.14; // 0.14 kg CO2/km for average car
    const busEmissions = Number(formData.busKm) * 0.082; // 0.082 kg CO2/km for bus
    
    console.log('Transport Calculations:', {
      carKm: formData.carKm,
      busKm: formData.busKm,
      carEmissions,
      busEmissions
    });

    // Energy emissions
    let electricityEmissions = 0;
    
    if (formData.useExactElectricity) {
      // Nigeria's grid emission factor: 0.43 kg CO2/kWh
      electricityEmissions = Number(formData.electricity) * 0.43;
    } else if (formData.electricityHours) {
      const averageHours = formData.electricityHours === "24" ? 24 
        : formData.electricityHours === "18-24" ? 21 
        : formData.electricityHours === "12-18" ? 15 
        : formData.electricityHours === "6-12" ? 9 
        : 3;
      
      const daysPerWeek = Number(formData.electricityDays);
      const monthlyHours = (averageHours * daysPerWeek * 4.33);
      // Average household consumption: 1.5 kWh per hour
      electricityEmissions = monthlyHours * 1.5 * 0.43;
    }

    console.log('Electricity Calculations:', {
      useExact: formData.useExactElectricity,
      hours: formData.electricityHours,
      days: formData.electricityDays,
      emissions: electricityEmissions
    });

    // Generator emissions calculation
    let generatorEmissions = 0;
    if (formData.generatorType && formData.generatorHours) {
      const fuelRates = {
        small: 0.7,  // Small generator (< 2.5 KVA)
        medium: 1.2, // Medium generator (2.5-5 KVA)
        large: 2.0   // Large generator (> 5 KVA)
      };

      const hoursPerDay = Number(formData.generatorHours);
      const fuelRate = fuelRates[formData.generatorType as keyof typeof fuelRates];
      const monthlyFuel = hoursPerDay * 30 * fuelRate;
      // Diesel emission factor: 2.68 kg CO2 per liter
      generatorEmissions = monthlyFuel * 2.68;

      console.log('Generator Calculations:', {
        type: formData.generatorType,
        hours: hoursPerDay,
        fuelRate,
        monthlyFuel,
        emissions: generatorEmissions
      });
    }

    // Waste emissions
    // Average waste emission: 2.86 kg CO2 per kg of waste
    const wasteEmissions = Number(formData.waste) * 52 * 2.86;
    // Recycling reduces emissions by 1.04 kg CO2 per kg recycled
    const recyclingOffset = Number(formData.recycling) * 52 * 1.04;

    console.log('Waste Calculations:', {
      waste: formData.waste,
      recycling: formData.recycling,
      wasteEmissions,
      recyclingOffset
    });

    // Convert to annual tons (divide by 1000 to convert from kg to tons)
    const transport = (carEmissions + busEmissions) * 12 / 1000;
    const energy = (electricityEmissions + generatorEmissions) * 12 / 1000;
    const waste = (wasteEmissions - recyclingOffset) / 1000;

    console.log('Final Annual Emissions (tons):', {
      transport,
      energy,
      waste,
      total: transport + energy + waste
    });

    return {
      total: transport + energy + waste,
      breakdown: [
        { category: "Transport", value: transport },
        { category: "Energy", value: energy },
        { category: "Waste", value: waste },
      ],
    };
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
              electricityDays: "1",
              generatorType: "",
              generatorHours: "4",
              useExactElectricity: false,
            })}
          >
            Reset Calculator
          </Button>
          <p className="text-sm text-gray-600 mb-8">
            * This calculator provides estimates based on average emission factors in Nigeria
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <h3 className="text-2xl font-bold text-title">Want a More Detailed Analysis?</h3>
            <p className="text-gray-600">
              Get a detailed analysis of your carbon footprint, personalized AI recommendations, and actionable insights. Join us to create a sustainable future!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center space-y-3">
                <div className="text-eco-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                </div>
                <h4 className="font-semibold">Detailed Analysis</h4>
                <p className="text-sm text-gray-600 text-center">
                  Personalized recommendations and insights
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-3">
                <div className="text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22a8 8 0 1 1 16 0"/><path d="M10 6a6 6 0 0 1 12 0c0 7-7.5 11-10 12.5-1.5-.9-4.8-2.8-7.5-5.5"/></svg>
                </div>
                <h4 className="font-semibold">Project Suggestions</h4>
                <p className="text-sm text-gray-600 text-center">
                  Local tree planting and renewable energy initiatives
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-3">
                <div className="text-yellow-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                </div>
                <h4 className="font-semibold">Educational Content</h4>
                <p className="text-sm text-gray-600 text-center">
                  Access eco-friendly product recommendations
                </p>
              </div>
            </div>

            <Button className="mt-8 bg-eco-primary hover:bg-eco-primary/90 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Sign Up Now <span className="ml-2">→</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;