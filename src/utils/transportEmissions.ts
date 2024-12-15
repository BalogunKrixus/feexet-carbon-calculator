export const getCarEmissionFactor = (carYear: string) => {
  switch (carYear) {
    case "new": // 2020 or newer
      return 0.03; // Reduced from 0.04
    case "recent": // 2015-2019
      return 0.045; // Reduced from 0.06
    case "older": // 2010-2014
      return 0.06; // Reduced from 0.08
    case "old": // Before 2010
      return 0.075; // Reduced from 0.1
    default:
      return 0.045;
  }
};

export const getFrequencyMultiplier = (frequency: string) => {
  const FREQUENCY_MULTIPLIERS = {
    daily: 30,
    weekdays: 20,
    weekends: 8,
    few_times: 12,
    once_week: 4,
    monthly: 1.5,
    rarely: 0.5,
  };
  return FREQUENCY_MULTIPLIERS[frequency as keyof typeof FREQUENCY_MULTIPLIERS] || 1;
};

export const getFlightEmissions = (frequency: string, type: string) => {
  const flightFactors = {
    domestic: 0.035,    // Reduced from 0.05
    international: 0.1, // Reduced from 0.15
    both: 0.135        // Reduced from 0.2
  };

  const frequencyMultipliers = {
    none: 0,
    rare: 1,
    occasional: 2,
    frequent: 4
  };

  const flightFactor = flightFactors[type as keyof typeof flightFactors] || 0;
  const frequencyMultiplier = frequencyMultipliers[frequency as keyof typeof frequencyMultipliers] || 0;

  return flightFactor * frequencyMultiplier;
};

export const calculateTransportEmissions = (
  carKm: string, 
  busKm: string, 
  carYear: string, 
  frequency: string,
  flightFrequency: string, 
  flightType: string
) => {
  const carEmissionFactor = getCarEmissionFactor(carYear);
  const frequencyMultiplier = getFrequencyMultiplier(frequency);
  
  const carEmissions = Number(carKm) * carEmissionFactor;
  const busEmissions = Number(busKm) * 0.015; // Reduced from 0.02
  const flightEmissions = getFlightEmissions(flightFrequency, flightType) * 1000;

  console.log('Transport Emissions Calculation:', {
    carYear,
    carEmissionFactor,
    frequencyMultiplier,
    carEmissions,
    busEmissions,
    flightEmissions,
    flightData: {
      frequency: flightFrequency,
      type: flightType
    }
  });

  return { 
    carEmissions, 
    busEmissions,
    flightEmissions 
  };
};