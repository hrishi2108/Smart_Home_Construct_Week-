import { useState } from 'react';
import '../../styles/components/RoomManager.css';

export const AddRoomModal = ({ onClose, onSave }) => {
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!roomName.trim()) {
      setError('Room name cannot be empty');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await onSave(roomName);
      setRoomName('');
      onClose();
    } catch (error) {
      setError('Failed to add room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-button" onClick={onClose} disabled={loading}>
          &times;
        </button>
        <h2>Add New Room</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter room name (e.g., Living Room, Kitchen)"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <div className="modal-buttons">
            <button 
              type="submit" 
              className="save-button"
              disabled={loading || !roomName.trim()}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={onClose} 
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};