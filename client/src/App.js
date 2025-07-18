// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
