// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
