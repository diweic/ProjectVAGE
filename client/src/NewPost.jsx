// client/src/NewPosts.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NewPost() {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 9) {
      setError('You can upload up to 9 images.');
    } else {
      setImages(files);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in.');
      navigate('/login');
      return;
    }

    if (images.length === 0) {
      setError('At least one image is required.');
      return;
    }

    try {
      // Upload images to S3
      const formData = new FormData();
      images.forEach(file => formData.append('images', file));

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const { urls } = await uploadRes.json();

      if (!uploadRes.ok || !urls) {
        throw new Error('Image upload failed.');
      }

      // Submit post
      const postRes = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          content,
          imageUrls: urls
        })
      });

      const postData = await postRes.json();

      if (!postRes.ok) {
        throw new Error(postData.message || 'Post creation failed.');
      }

      setMessage('Post submitted!');
      setContent('');
      setImages([]);
      setTimeout(() => navigate('/profile'), 1000);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div>
      <h1>Create New Post</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's this post about?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          cols={50}
          required
        /><br /><br />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          required
        /><br /><br />

        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default NewPost;
