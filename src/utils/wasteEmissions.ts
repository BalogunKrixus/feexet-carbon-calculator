export const calculateWasteEmissions = (waste: string, recycling: string) => {
  const wasteEmissions = Number(waste) * 52 * 2.86;
  const recyclingOffset = Number(recycling) * 52 * 1.04;
  return { wasteEmissions, recyclingOffset };
};