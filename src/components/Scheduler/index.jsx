import { useState, useEffect } from 'react';
import axios from 'axios';
import { ScheduleCard } from './ScheduleCard';
import { AddScheduleModal } from './AddScheduleModal';
import '../../styles/components/Scheduler.css';

export const Scheduler = () => {
  const [schedules, setSchedules] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch schedules from Firebase when the component is mounted
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('https://assing-cd7ba-default-rtdb.firebaseio.com/schedules.json');
        const fetchedSchedules = response.data ? Object.keys(response.data).map(key => ({
          id: key,
          ...response.data[key]
        })) : [];
        setSchedules(fetchedSchedules);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, []);

  const addSchedule = async (newSchedule) => {
    try {
      const response = await axios.post('https://assing-cd7ba-default-rtdb.firebaseio.com/schedules.json', newSchedule);
      const addedSchedule = { ...newSchedule, id: response.data.name };
      setSchedules([...schedules, addedSchedule]);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding schedule:', error);
    }
  };

  const deleteSchedule = async (id) => {
    try {
      await axios.delete(`https://assing-cd7ba-default-rtdb.firebaseio.com/schedules/${id}.json`);
      setSchedules(schedules.filter(schedule => schedule.id !== id));
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  return (
    <div className="scheduler">
      <button 
        className="add-schedule-button"
        onClick={() => setShowAddModal(true)}
      >
        + Add New Schedule
      </button>

      <div className="schedule-list">
        {schedules.map(schedule => (
          <ScheduleCard 
            key={schedule.id}
            schedule={schedule}
            onDelete={deleteSchedule} 
          />
        ))}
      </div>

      {showAddModal && (
        <AddScheduleModal
          onClose={() => setShowAddModal(false)}
          onSave={addSchedule}
        />
      )}
    </div>
  );
};
