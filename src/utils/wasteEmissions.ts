export const calculateWasteEmissions = (waste: string, recycling: string) => {
  const wasteEmissions = Number(waste) * 52 * 0.6; // Reduced from 0.8
  const recyclingOffset = Number(recycling) * 52 * 0.45; // Reduced from 0.6
  return { wasteEmissions, recyclingOffset };
};