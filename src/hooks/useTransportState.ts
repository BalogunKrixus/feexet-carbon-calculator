import { useState, useEffect } from 'react';

export const useTransportState = (onChange: (field: string, value: string) => void) => {
  const [transportMode, setTransportMode] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [carYear, setCarYear] = useState("");
  const [flightFrequency, setFlightFrequency] = useState("none");
  const [flightType, setFlightType] = useState("domestic");

  useEffect(() => {
    const handleReset = () => {
      setTransportMode("");
      setFrequency("monthly");
      setCarYear("");
      setFlightFrequency("none");
      setFlightType("domestic");
    };

    window.addEventListener('reset', handleReset);
    return () => window.removeEventListener('reset', handleReset);
  }, []);

  return {
    transportMode,
    frequency,
    carYear,
    flightFrequency,
    flightType,
    setTransportMode,
    setFrequency,
    setCarYear,
    setFlightFrequency,
    setFlightType
  };
};