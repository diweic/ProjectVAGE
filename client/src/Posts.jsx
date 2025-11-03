// client/src/Posts.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [imagesMap, setImagesMap] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to fetch posts');

        setPosts(data.posts);
        setImagesMap(data.imagesByPostId);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      <button onClick={() => navigate('/profile')}>Back to Profile</button>
      <button onClick={() => navigate('/new-post')}>Create a Post</button>
      <br /><br />
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {posts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ccc', padding: '1em', marginBottom: '1em' }}>
          <p><strong>@{post.author_username}</strong></p>
          <p>{post.content}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em', justifyContent: 'center' }}>
            {(imagesMap[post.id] || []).map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt="post-img"
                style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover' }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
