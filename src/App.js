// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen'; // Import the HomeScreen component
import UsernameForm from './components/UsernameForm'; // Import the UsernameForm component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} /> {/* HomeScreen is the default route */}
        <Route path="/username-form" element={<UsernameForm />} /> {/* UsernameForm is accessible via /username-form */}
      </Routes>
    </Router>
  );
};

export default App;
