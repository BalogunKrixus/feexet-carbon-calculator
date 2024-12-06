interface EnergyFormData {
  electricity: string;
  generator: string;
  electricityHours: string;
  electricityDays: string;
  generatorType: string;
  generatorHours: string;
  useExactElectricity?: boolean;
}

export const calculateEnergyEmissions = (formData: EnergyFormData) => {
  let electricityEmissions = 0;
  
  if (formData.useExactElectricity) {
    electricityEmissions = Number(formData.electricity) * 0.25; // Reduced electricity emissions factor
  } else if (formData.electricityHours) {
    const averageHours = formData.electricityHours === "24" ? 24 
      : formData.electricityHours === "18-24" ? 21 
      : formData.electricityHours === "12-18" ? 15 
      : formData.electricityHours === "6-12" ? 9 
      : 3;
    
    const daysPerWeek = Number(formData.electricityDays);
    const monthlyHours = (averageHours * daysPerWeek * 4.33);
    electricityEmissions = monthlyHours * 0.8 * 0.25; // Reduced consumption and emissions factors
  }

  let generatorEmissions = 0;
  if (formData.generatorType && formData.generatorHours) {
    const fuelRates = {
      small: 0.4,  // Reduced fuel consumption rates
      medium: 0.7,
      large: 1.2
    };

    const hoursPerDay = Number(formData.generatorHours);
    const fuelRate = fuelRates[formData.generatorType as keyof typeof fuelRates];
    const monthlyFuel = hoursPerDay * 30 * fuelRate;
    generatorEmissions = monthlyFuel * 1.8; // Reduced emissions factor for generator fuel
  }

  return { electricityEmissions, generatorEmissions };
};