import { useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import '../../styles/components/Scheduler.css';

export const AddScheduleModal = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [action, setAction] = useState('');
  const [days, setDays] = useState([]);

  const dayOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day) => {
    setDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && time && action && days.length) {
      const newSchedule = { name, time, action, days };

      try {
        // Make a POST request to Firebase to save the new schedule
        const response = await axios.post('https://assing-cd7ba-default-rtdb.firebaseio.com/schedules.json', newSchedule);
        
        // After successful save, pass the schedule back to parent component
        const savedSchedule = { id: response.data.name, ...newSchedule };
        onSave(savedSchedule);

        // Reset fields and close the modal
        setName('');
        setTime('');
        setAction('');
        setDays([]);
        onClose();
      } catch (error) {
        console.error('Error adding schedule:', error);
      }
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add New Schedule</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Routine Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <input 
            type="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Action (e.g. Turn on AC)" 
            value={action} 
            onChange={(e) => setAction(e.target.value)} 
          />
          
          <div className="day-selector">
            {dayOptions.map((day) => (
              <button
                key={day}
                type="button"
                className={days.includes(day) ? 'selected' : ''}
                onClick={() => toggleDay(day)}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
