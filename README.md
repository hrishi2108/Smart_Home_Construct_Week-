# Smart Home Manager

## Introduction
Smart Home Manager is a web application designed to simulate the management of a smart home system.  
Users can add rooms, manage devices (like lights, fans, ACs, TVs), schedule device operations, and monitor energy usage.  
It provides an intuitive, responsive, and dynamic interface to demonstrate real-time control over a smart environment.

---

## Project Type
**Frontend** (with Firebase Realtime Database)

---

## Deployed App
**Visit the Live App:**  
[https://radiant-alpaca-19a8f8.netlify.app](https://radiant-alpaca-19a8f8.netlify.app)

**Video Walkthrough:**  
[Watch the Project Walkthrough](https://drive.google.com/file/d/1eKQnAbxA0wf9T6r11S_AJnpm9sU7X31a/view?usp=sharing)

---

## Features
- **Authentication:**  
  Sign up and login functionality using Firebase Realtime Database and Axios.

- **Dashboard:**  
  Central hub with quick navigation buttons for Add Room, Schedule, and Energy Usage.

- **Room Management:**  
  Dynamically add rooms (e.g., Bedroom, Kitchen) and manage devices inside each room.

- **Device Control:**  
  Add devices like Lights, Fans, ACs, TVs to rooms. Toggle device status (On/Off) in real-time.

- **Scheduling:**  
  Schedule device operations (e.g., turn off Light at 10 PM every day).

- **Energy Usage Graphs:**  
  Monitor approximate energy usage based on active devices.

- **Responsive UI:**  
  Fully optimized for desktops, tablets, and mobile devices.

---

## Design Decisions & Assumptions
- **Custom CSS:**  
  Designed a clean and modern interface without using any CSS frameworks like Chakra UI.

- **Firebase Realtime Database with Axios:**  
  Used Axios to interact with Firebase instead of the Firebase SDK for better control over API requests.

- **Separation of Concerns:**  
  Each feature is modularized into components and pages for better maintainability.

- **User Experience Focus:**  
  Smooth navigation and real-time UI updates to simulate a real smart home environment.

---

## Installation & Getting Started

### Clone the Repository
```bash
git clone https://github.com/hrishi2108/Smart_Home_Construct_Week-.git
cd Smart_Home_Construct_Week-
npm install
npm run dev
