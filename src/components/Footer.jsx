import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>Smart Home Manager &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
