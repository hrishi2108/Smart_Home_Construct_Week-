import { useState } from 'react';
import '../../styles/components/RoomManager.css';

const deviceTypes = [
  { name: 'Light', icon: '💡' },
  { name: 'Fan', icon: '🌀' },
  { name: 'AC', icon: '❄️' },
  { name: 'TV', icon: '📺' },
  { name: 'Speaker', icon: '🔊' }
];

export const DeviceControl = ({ onAddDevice, loading }) => {
  const [deviceName, setDeviceName] = useState('');
  const [selectedType, setSelectedType] = useState(deviceTypes[0].name);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deviceName.trim()) return;
    onAddDevice(deviceName, selectedType);
    setDeviceName('');
  };

  return (
    <div className="device-control">
      <form onSubmit={handleSubmit} className="add-device-form">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          disabled={loading}
        >
          {deviceTypes.map(type => (
            <option key={type.name} value={type.name}>
              {type.icon} {type.name}
            </option>
          ))}
        </select>
        
        <input
          type="text"
          placeholder="Device name"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          disabled={loading}
        />
        
        <button type="submit" disabled={loading || !deviceName.trim()}>
          {loading ? 'Adding...' : 'Add Device'}
        </button>
      </form>
    </div>
  );
};