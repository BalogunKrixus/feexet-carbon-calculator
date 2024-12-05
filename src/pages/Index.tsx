import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Results } from "@/components/Calculator/Results";
import { HeroSection } from "@/components/Calculator/HeroSection";
import { CalculatorTabs } from "@/components/Calculator/CalculatorTabs";

const DEFAULT_FORM_STATE = {
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
  carYear: "",
  flightFrequency: "none",
  flightType: "domestic",
};

const getCarEmissionFactor = (carYear: string) => {
  // Newer cars have lower emission factors
  switch (carYear) {
    case "new": // 2020 or newer
      return 0.12;
    case "recent": // 2015-2019
      return 0.14;
    case "older": // 2010-2014
      return 0.16;
    case "old": // Before 2010
      return 0.18;
    default:
      return 0.14; // Default factor if no year selected
  }
};

const getFlightEmissions = (frequency: string, type: string) => {
  const flightFactors = {
    domestic: 0.2,
    international: 0.4,
    both: 0.6
  };

  const frequencyMultipliers = {
    none: 0,
    rare: 1,      // 1-2 flights per year
    occasional: 4, // 3-5 flights per year
    frequent: 8    // 6+ flights per year
  };

  const flightFactor = flightFactors[type as keyof typeof flightFactors] || 0;
  const frequencyMultiplier = frequencyMultipliers[frequency as keyof typeof frequencyMultipliers] || 0;

  return flightFactor * frequencyMultiplier;
};

const calculateTransportEmissions = (carKm: string, busKm: string, carYear: string, flightFrequency: string, flightType: string) => {
  const carEmissionFactor = getCarEmissionFactor(carYear);
  const carEmissions = Number(carKm) * carEmissionFactor;
  const busEmissions = Number(busKm) * 0.082;
  const flightEmissions = getFlightEmissions(flightFrequency, flightType);

  return { 
    carEmissions, 
    busEmissions,
    flightEmissions 
  };
};

const calculateEnergyEmissions = (formData: typeof DEFAULT_FORM_STATE) => {
  let electricityEmissions = 0;
  
  if (formData.useExactElectricity) {
    electricityEmissions = Number(formData.electricity) * 0.43;
  } else if (formData.electricityHours) {
    const averageHours = formData.electricityHours === "24" ? 24 
      : formData.electricityHours === "18-24" ? 21 
      : formData.electricityHours === "12-18" ? 15 
      : formData.electricityHours === "6-12" ? 9 
      : 3;
    
    const daysPerWeek = Number(formData.electricityDays);
    const monthlyHours = (averageHours * daysPerWeek * 4.33);
    electricityEmissions = monthlyHours * 1.5 * 0.43;
  }

  let generatorEmissions = 0;
  if (formData.generatorType && formData.generatorHours) {
    const fuelRates = {
      small: 0.7,
      medium: 1.2,
      large: 2.0
    };

    const hoursPerDay = Number(formData.generatorHours);
    const fuelRate = fuelRates[formData.generatorType as keyof typeof fuelRates];
    const monthlyFuel = hoursPerDay * 30 * fuelRate;
    generatorEmissions = monthlyFuel * 2.68;
  }

  return { electricityEmissions, generatorEmissions };
};

const calculateWasteEmissions = (waste: string, recycling: string) => {
  const wasteEmissions = Number(waste) * 52 * 2.86;
  const recyclingOffset = Number(recycling) * 52 * 1.04;
  return { wasteEmissions, recyclingOffset };
};

const Index = () => {
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const calculateEmissions = () => {
    const { carEmissions, busEmissions, flightEmissions } = calculateTransportEmissions(
      formData.carKm, 
      formData.busKm, 
      formData.carYear,
      formData.flightFrequency,
      formData.flightType
    );
    
    const { electricityEmissions, generatorEmissions } = calculateEnergyEmissions(formData);
    const { wasteEmissions, recyclingOffset } = calculateWasteEmissions(formData.waste, formData.recycling);

    const transport = (carEmissions + busEmissions + flightEmissions) * 12 / 1000;
    const energy = (electricityEmissions + generatorEmissions) * 12 / 1000;
    const waste = (wasteEmissions - recyclingOffset) / 1000;

    console.log('Final Annual Emissions (tons):', {
      transport,
      energy,
      waste,
      total: transport + energy + waste,
      carYear: formData.carYear,
      flightData: {
        frequency: formData.flightFrequency,
        type: formData.flightType,
        emissions: flightEmissions
      }
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

  const handleReset = () => {
    setFormData(DEFAULT_FORM_STATE);
    setShowSuggestions(false);
    const event = new Event('reset');
    window.dispatchEvent(event);
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
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
          />
        </div>

        <div className="text-center space-y-6 animate-fade-in">
          <Button
            className="bg-eco-primary hover:bg-eco-primary/90 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleReset}
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
