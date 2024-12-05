export const getCarEmissionFactor = (carYear: string) => {
  switch (carYear) {
    case "new": // 2020 or newer
      return 0.12; // More efficient vehicles
    case "recent": // 2015-2019
      return 0.15;
    case "older": // 2010-2014
      return 0.18;
    case "old": // Before 2010
      return 0.22; // Less efficient vehicles
    default:
      return 0.15;
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
  // Emission factors in tons CO2 per flight
  const flightFactors = {
    domestic: 0.2,    // Shorter flights
    international: 0.6, // Long-haul flights
    both: 0.9         // Mix of both
  };

  // Annual frequency multipliers
  const frequencyMultipliers = {
    none: 0,
    rare: 2,      // 1-2 flights per year
    occasional: 6, // 3-5 flights per year
    frequent: 12   // 6+ flights per year
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
  
  const carEmissions = Number(carKm) * carEmissionFactor * frequencyMultiplier;
  const busEmissions = Number(busKm) * 0.082 * frequencyMultiplier;
  const flightEmissions = getFlightEmissions(flightFrequency, flightType);

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