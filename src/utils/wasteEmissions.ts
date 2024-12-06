export const calculateWasteEmissions = (waste: string, recycling: string) => {
  const wasteEmissions = Number(waste) * 52 * 0.8; // Further reduced waste emissions factor
  const recyclingOffset = Number(recycling) * 52 * 0.6; // Further adjusted recycling offset
  return { wasteEmissions, recyclingOffset };
};