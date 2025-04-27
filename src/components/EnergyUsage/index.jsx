import { useState, useEffect } from 'react';
import { EnergyChart } from './EnergyChart';
import '../../styles/components/EnergyUsage.css';

export const EnergyUsage = () => {
  const [energyData, setEnergyData] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      const mockData = {
        totalUsage: 45.2,
        devices: [
          { name: 'AC Unit', usage: 22.5 },
          { name: 'Lights', usage: 8.3 },
          { name: 'TV', usage: 14.4 }
        ],
        weeklyUsage: [12, 19, 15, 17, 14, 18, 16]
      };
      setEnergyData(mockData);
    };

    fetchData();
  }, []);

  return (
    <div className="energy-usage">
      <h2>Energy Consumption Overview</h2>
      
      <div className="energy-stats">
        <div className="total-usage">
          <h3>Total Usage</h3>
          <p className="usage-value">{energyData?.totalUsage || '--'} kWh</p>
        </div>
        
        <div className="device-usage">
          <h3>Usage by Device</h3>
          <ul>
            {energyData?.devices.map(device => (
              <li key={device.name}>
                <span>{device.name}</span>
                <span>{device.usage} kWh</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="energy-chart-container">
        <EnergyChart data={energyData?.weeklyUsage || []} />
      </div>
    </div>
  );
};