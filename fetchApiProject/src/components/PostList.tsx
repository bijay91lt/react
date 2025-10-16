// PostList.tsx

import { useState } from 'react';
import type { Post } from './types';

interface PostListProps {
  posts: Post[];
  searchQuery: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updated: { title: string; body: string }) => void;
  onView: (id: number) => void;
}

function PostList({ posts, searchQuery, onDelete, onUpdate, onView }: PostListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startEditing = (post: Post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditBody(post.body);
  };

  const saveEdit = (id: number) => {
    onUpdate(id, { title: editTitle, body: editBody });
    setEditingId(null);
  };

  return (
    <ul className="mt-6 space-y-4">
      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        filteredPosts.map(post => (
          <li key={post.id} className="border rounded p-4">
            {editingId === post.id ? (
              <div>
                <input
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="w-full p-2 border mb-2"
                />
                <textarea
                  value={editBody}
                  onChange={e => setEditBody(e.target.value)}
                  className="w-full p-2 border mb-2"
                  rows={3}
                />
                <div>
                  <button
                    onClick={() => saveEdit(post.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="mt-1 text-gray-700">{post.body}</p>
                <div className="mt-3 space-x-2">
                  <button
                    onClick={() => onView(post.id)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => startEditing(post)}
                    className="text-green-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(post.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))
      )}
    </ul>
  );
}

export default PostList;