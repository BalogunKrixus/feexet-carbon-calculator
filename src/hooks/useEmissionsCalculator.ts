import { useState } from 'react';
import { calculateTransportEmissions } from '../utils/transportEmissions';
import { calculateEnergyEmissions } from '../utils/energyEmissions';
import { calculateWasteEmissions } from '../utils/wasteEmissions';

export interface EmissionsFormData {
  carKm: string;
  busKm: string;
  electricity: string;
  generator: string;
  waste: string;
  recycling: string;
  electricityHours: string;
  electricityDays: string;
  generatorType: string;
  generatorHours: string;
  useExactElectricity: boolean;
  carYear: string;
  flightFrequency: string;
  flightType: string;
  frequency: string;
}

export const DEFAULT_FORM_STATE: EmissionsFormData = {
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
  frequency: "monthly",
};

export const useEmissionsCalculator = () => {
  const [formData, setFormData] = useState<EmissionsFormData>(DEFAULT_FORM_STATE);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const calculateEmissions = () => {
    const { carEmissions, busEmissions, flightEmissions } = calculateTransportEmissions(
      formData.carKm,
      formData.busKm,
      formData.carYear,
      formData.frequency,
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

  return {
    formData,
    showSuggestions,
    setShowSuggestions,
    handleChange,
    handleReset,
    calculateEmissions,
  };
};