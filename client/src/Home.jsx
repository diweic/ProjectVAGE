// client/src/Home.jsx
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Vintage Anime Goods Exchange :)</h1>
      <h3>A platform to trade anime fan goods like badges, figures, and more.</h3>

      <br />
      <button onClick={() => navigate('/posts')}>View All Posts</button>
      <br /><br />
      <button onClick={() => navigate('/signup')}>Sign Up</button>
      <br /><br />
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
}

export default Home;
