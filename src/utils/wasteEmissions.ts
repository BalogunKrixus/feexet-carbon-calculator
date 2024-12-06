export const calculateWasteEmissions = (waste: string, recycling: string) => {
  const wasteEmissions = Number(waste) * 52 * 1.2; // Reduced waste emissions factor
  const recyclingOffset = Number(recycling) * 52 * 0.8; // Adjusted recycling offset
  return { wasteEmissions, recyclingOffset };
};