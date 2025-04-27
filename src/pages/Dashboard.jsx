import { useState } from 'react';
import { RoomManager } from '../components/RoomManager';
import { Scheduler } from '../components/Scheduler';
import { EnergyUsage } from '../components/EnergyUsage';
import '../styles/components/Dashboard.css';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('rooms');

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Smart Home Manager</h1>
        <nav className="tabs">
          <button 
            className={activeTab === 'rooms' ? 'active' : ''}
            onClick={() => setActiveTab('rooms')}
          >
            Rooms
          </button>
          <button 
            className={activeTab === 'schedules' ? 'active' : ''}
            onClick={() => setActiveTab('schedules')}
          >
            Schedules
          </button>
          <button 
            className={activeTab === 'energy' ? 'active' : ''}
            onClick={() => setActiveTab('energy')}
          >
            Energy Usage
          </button>
        </nav>
      </header>

      <main className="dashboard-content">
        {activeTab === 'rooms' && <RoomManager />}
        {activeTab === 'schedules' && <Scheduler />}
        {activeTab === 'energy' && <EnergyUsage />}
      </main>
    </div>
  );
};