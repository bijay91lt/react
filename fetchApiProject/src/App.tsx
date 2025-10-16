import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PostList from './components/PostList';
import type { Post } from '../src/components/types';
import Header from './components/Header';

const API_BASE = 'https://jsonplaceholder.typicode.com';

function App() {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all posts on mount
  useEffect(() => {
    fetch(`${API_BASE}/posts`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // 🔴 DELETE
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/posts/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setData(data.filter(post => post.id !== id));
      }
    } catch (error) {
      alert('Failed to update post:'+{error});
    }
  };

  // 🟡 UPDATE (PUT)
  const handleUpdate = async (id: number, updatedPost: Omit<Post, 'id' | 'userId'>) => {
    try {
      const res = await fetch(`${API_BASE}/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          userId: data.find(p => p.id === id)?.userId || 1,
          ...updatedPost,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setData(data.map(post => (post.id === id ? updated : post)));
      }
    } catch (error) {
      alert('Failed to update post:'+{error});
    }
  };

  // 🔵 VIEW (optional: fetch single post)
  const handleView = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/posts/${id}`);
      if (res.ok) {
        const post = await res.json();
        console.log('Viewing post:', post);
      }
    } catch (error) {
      alert('Failed to update post:'+{error});
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <Header/>
      <SearchBar onSearch={setSearchQuery} />
      <PostList
        posts={data}
        searchQuery={searchQuery}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onView={handleView}
      />
    </div>
  );
}

export default App;