// client/src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Signup from './Signup';
import NewPost from './NewPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/new-post" element={<NewPost />} />
      </Routes>
    </Router>
  );
}

export default App;
