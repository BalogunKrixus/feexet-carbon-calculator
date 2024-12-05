const BASE_DISTANCES = {
  car: 500,
  public: 300,
  bike: 100,
};

const FREQUENCY_MULTIPLIERS = {
  daily: 30,
  weekdays: 20,
  weekends: 8,
  few_times: 12,
  once_week: 4,
  monthly: 1.5,
  rarely: 0.5,
};

export const calculateTransportDistances = (
  transportMode: string,
  frequency: string
) => {
  const baseDistance = BASE_DISTANCES[transportMode as keyof typeof BASE_DISTANCES] || 0;
  const multiplier = FREQUENCY_MULTIPLIERS[frequency as keyof typeof FREQUENCY_MULTIPLIERS];
  const estimatedDistance = baseDistance * multiplier;

  return {
    carKm: transportMode === "car" ? estimatedDistance : 0,
    busKm: transportMode === "public" ? estimatedDistance : 0,
  };
};