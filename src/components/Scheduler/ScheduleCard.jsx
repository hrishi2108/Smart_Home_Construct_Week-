import '../../styles/components/Scheduler.css';

export const ScheduleCard = ({ schedule, onDelete }) => {
  const { id, name, time, action, days } = schedule;

  return (
    <div className="schedule-card">
      <h3>{name}</h3>
      <p><strong>Time:</strong> {time}</p>
      <p><strong>Action:</strong> {action}</p>
      <div className="schedule-days">
        {days.length > 0 ? (
          days.map((day, idx) => (
            <span key={idx} className="day-badge">{day}</span>
          ))
        ) : (
          <span>No days selected</span>
        )}
      </div>
      <button 
        className="delete-schedule-button" 
        onClick={() => onDelete(id)} 
      >
        Delete
      </button>
    </div>
  );
};
