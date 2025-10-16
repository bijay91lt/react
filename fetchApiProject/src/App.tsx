import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PostList from './components/PostList';
import type { Post } from '../src/components/types';
import Header from './components/Header';
import Footer from './components/Footer';
import PostCard from './components/PostCard';
import Modal from './modals/Modal';

const API_BASE = 'https://jsonplaceholder.typicode.com';

function App() {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  // const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({title: '', body: ''});

  // Fetch all posts 
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

  // DELETE
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

  // UPDATE 
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

  // VIEW
  const handleView = async (id: number) => {
    setSelectedPostId(id);
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

  //CREATE POST
  const handleCreatePost = async () => {
    if(!newPost.title.trim() || !newPost.body.trim()) return;

    try{
      const res = await fetch (`${API_BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: newPost.title,
          body:newPost.body,
          userId: 1,
        }),
      });

      if(res.ok){
        const createdPost: Post = await res.json();
        setData([createdPost, ...data]);
        setNewPost({title: '', body: ''});
        setIsModalOpen(false);
      }
    } catch(error){
      alert('Failed to update post:'+{error});
    }
    // setShowNewPostForm(false);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      {selectedPostId ? (
        <div>
          <button 
          onClick={() => setSelectedPostId(null)}
          className="px-4 py-1 my-4 bg-gradient-to-r from-blue-500 to-purple-500 
    text-white font-bold rounded-full transition-transform transform-gpu 
    hover:-translate-y-1 hover:shadow-lg">Back to List
          </button>
          <PostCard postId={selectedPostId}/>
        </div>
      ) : (
        <>
        <Header onNewPostClick={() => setIsModalOpen(true)} />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Post"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreatePost();
            }}
          >
            <input
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              placeholder="Title"
              className="w-full p-2 mb-3 border border-gray-300 rounded"
              autoFocus
            />
            <textarea
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              placeholder="Body"
              rows={4}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              > 
                Save
              </button>
            </div>
          </form>
        </Modal>
        <SearchBar onSearch={setSearchQuery} />
        <PostList
          posts={data}
          searchQuery={searchQuery}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onView={handleView}
        />
        <Footer/>
        </>
        
      )}
    </div>
  );
}

export default App;