export const getCarEmissionFactor = (carYear: string) => {
  switch (carYear) {
    case "new": // 2020 or newer
      return 0.08; // More efficient vehicles
    case "recent": // 2015-2019
      return 0.1;
    case "older": // 2010-2014
      return 0.12;
    case "old": // Before 2010
      return 0.15; // Less efficient vehicles
    default:
      return 0.1;
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
  // Emission factors in tons CO2 per flight (reduced values)
  const flightFactors = {
    domestic: 0.1,    // Shorter flights
    international: 0.3, // Long-haul flights
    both: 0.4         // Mix of both
  };

  // Annual frequency multipliers
  const frequencyMultipliers = {
    none: 0,
    rare: 1,      // 1-2 flights per year
    occasional: 3, // 3-5 flights per year
    frequent: 6   // 6+ flights per year
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
  const busEmissions = Number(busKm) * 0.04; // Reduced bus emissions factor
  const flightEmissions = getFlightEmissions(flightFrequency, flightType) * 1000; // Convert to kg CO2

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