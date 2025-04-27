import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainDashboard.css";

export const MainDashboard = () => {
  const navigate = useNavigate();

  const handleBegin = () => {
    navigate("/dashboard"); // You can change this route
  };

  return (
    <>
    <header>
        <h1>Smart Home Manager</h1>
    </header>
    <div className="main-dashboard">
      
      <div className="content">
        <h1>Welcome to Smart Home Manager</h1>
        <p>Your intelligent control center for home automation</p>
        <button onClick={handleBegin}>Let’s Begin</button>
      </div>
      <div className="image">
        {/* <img
          src="https://i.pinimg.com/originals/f5/ba/5c/f5ba5c2fe0a35f76947d8c7fefa9f880.jpg"
          alt="Smart Home Illustration"
        /> */}
      </div>
    </div>
    </>
  );
};
