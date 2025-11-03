// client/src/Profile.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    fetch('/api/user-profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message?.startsWith('Welcome')) {
          setMessage(data.message);
        } else {
          localStorage.removeItem('token'); // clean up
          navigate('/login');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  return (
    <div>
      <h1>{message || 'Loading...'}</h1>

      
      <br /><br />
      <button onClick={() => navigate('/posts')}>View All Posts</button>
      <br /><br />
      <button onClick={() => navigate('/new-post')}>Create a Post</button>
      <br /><br />
      <button onClick={() => {
        localStorage.removeItem('token');
        navigate('/login');
      }}>Logout</button>
  
    </div>
  );
}

export default Profile;
