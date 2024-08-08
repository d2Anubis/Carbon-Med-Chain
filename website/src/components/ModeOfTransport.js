import React, { useState } from 'react';
import './ModeOfTransport.css';

const transportModes = [
  { label: 'Truck', emissionFactor: 2.68, fuelEfficiency: 7 }, // kg CO2 per liter, km/l
  { label: 'Train', emissionFactor: 0.92, fuelEfficiency: 350 }, // kg CO2 per liter, ton-km/l
  { label: 'Ship', emissionFactor: 3.15, fuelEfficiency: 0.04 }, // kg CO2 per liter, km/l
  { label: 'Airplane', emissionFactor: 3.16, fuelEfficiency: 0.35 }, // kg CO2 per liter, km/l
];

const ModeOfTransport = () => {
  const [transportMode, setTransportMode] = useState(transportModes[0]);
  const [distance, setDistance] = useState('');
  const [customFuelEfficiency, setCustomFuelEfficiency] = useState(transportModes[0].fuelEfficiency);
  const [emissions, setEmissions] = useState(null);

  const handleCalculate = () => {
    const fuelConsumed = distance / customFuelEfficiency;
    const totalEmissions = fuelConsumed * transportMode.emissionFactor;
    setEmissions(totalEmissions);
  };

  const handleTransportModeChange = (e) => {
    const selectedMode = transportModes.find(mode => mode.label === e.target.value);
    setTransportMode(selectedMode);
    setCustomFuelEfficiency(selectedMode.fuelEfficiency);
  };

  return (
    <div className="calculator-container">
      <h2>Transport Carbon Emission Calculator</h2>
      <div className="form-group">
        <label>Mode of Transport:</label>
        <select 
          value={transportMode.label} 
          onChange={handleTransportModeChange}
        >
          {transportModes.map(mode => (
            <option key={mode.label} value={mode.label}>{mode.label}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Distance Traveled (km):</label>
        <input 
          type="number" 
          value={distance} 
          onChange={(e) => setDistance(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Fuel Efficiency (km/l):</label>
        <input 
          type="number" 
          value={customFuelEfficiency} 
          onChange={(e) => setCustomFuelEfficiency(e.target.value)} 
        />
      </div>
      <button className="calculate-button" onClick={handleCalculate}>Calculate Emissions</button>
      {emissions !== null && (
        <div className="result">
          <h3>Total Emissions: {emissions.toFixed(2)} kg CO2</h3>
        </div>
      )}
    </div>
  );
};

export default ModeOfTransport;
