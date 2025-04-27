import { useState } from 'react';
import axios from 'axios';
import { DeviceControl } from './DeviceControl';
import '../../styles/components/RoomManager.css';

export const RoomCard = ({ room }) => {
  const [showDeviceControl, setShowDeviceControl] = useState(false);
  const [devices, setDevices] = useState(room.devices || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addDevice = async (deviceName, deviceType) => {
    try {
      setLoading(true);
      setError('');
      
      const newDevice = {
        name: deviceName,
        type: deviceType,
        status: false,
        createdAt: new Date().toISOString()
      };

      const response = await axios.post(
        `https://assing-cd7ba-default-rtdb.firebaseio.com/rooms/${room.id}/devices.json`,
        newDevice
      );

      const addedDevice = {
        ...newDevice,
        id: response.data.name
      };

      setDevices(prev => [...prev, addedDevice]);
    } catch (error) {
      console.error('Error adding device:', error);
      setError('Failed to add device. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleDevice = async (deviceId) => {
    try {
      setLoading(true);
      const device = devices.find(d => d.id === deviceId);
      const updatedStatus = !device.status;

      await axios.patch(
        `https://assing-cd7ba-default-rtdb.firebaseio.com/rooms/${room.id}/devices/${deviceId}.json`,
        { status: updatedStatus }
      );

      setDevices(prev => prev.map(d => 
        d.id === deviceId ? { ...d, status: updatedStatus } : d
      ));
    } catch (error) {
      console.error('Error toggling device:', error);
      setError('Failed to update device. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="room-card">
      <div className="room-header">
        <h3>{room.name}</h3>
        <button 
          className="manage-button"
          onClick={() => setShowDeviceControl(!showDeviceControl)}
          disabled={loading}
        >
          {showDeviceControl ? 'Hide' : 'Manage'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showDeviceControl && (
        <DeviceControl 
          onAddDevice={addDevice}
          loading={loading}
        />
      )}

      <div className="device-status">
        {devices.length > 0 ? (
          <ul>
            {devices.map(device => (
              <li key={device.id}>
                <span>{device.name}</span>
                <button
                  className={`status-button ${device.status ? 'on' : 'off'}`}
                  onClick={() => toggleDevice(device.id)}
                  disabled={loading}
                >
                  {device.status ? 'ON' : 'OFF'}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-devices">No devices added yet</p>
        )}
      </div>
    </div>
  );
};