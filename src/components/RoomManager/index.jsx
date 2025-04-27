import { useState, useEffect } from 'react';
import axios from 'axios';
import { RoomCard } from './RoomCard';
import { AddRoomModal } from './AddRoomModal';
import '../../styles/components/RoomManager.css';

export const RoomManager = () => {
  const [rooms, setRooms] = useState([]);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('https://assing-cd7ba-default-rtdb.firebaseio.com/rooms.json');
        
        if (response.data) {
          const roomsData = Object.entries(response.data).map(([id, roomData]) => ({
            id,
            ...roomData,
            devices: roomData.devices ? Object.entries(roomData.devices).map(([deviceId, device]) => ({
              id: deviceId,
              ...device
            })) : []
          }));
          setRooms(roomsData);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setError('Failed to load rooms. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRooms();
  }, []);

  const addRoom = async (roomName) => {
    try {
      setError('');
      const response = await axios.post('https://assing-cd7ba-default-rtdb.firebaseio.com/rooms.json', {
        name: roomName,
        devices: {},
        createdAt: new Date().toISOString()
      });

      const newRoom = {
        id: response.data.name,
        name: roomName,
        devices: []
      };

      setRooms(prevRooms => [...prevRooms, newRoom]);
      setShowAddRoomModal(false);
    } catch (error) {
      console.error('Error adding room:', error);
      setError('Failed to add room. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading rooms...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="room-manager">
      <button
        className="add-room-button"
        onClick={() => setShowAddRoomModal(true)}
      >
        + Add New Room
      </button>

      <div className="room-grid">
        {rooms.length > 0 ? (
          rooms.map(room => (
            <RoomCard
              key={room.id}
              room={room}
            />
          ))
        ) : (
          <p className="no-rooms">No rooms found. Add your first room!</p>
        )}
      </div>

      {showAddRoomModal && (
        <AddRoomModal
          onClose={() => setShowAddRoomModal(false)}
          onSave={addRoom}
        />
      )}
    </div>
  );
};