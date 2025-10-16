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
    <ul className="flex flex-col gap-3.5 w-full">
      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        filteredPosts.map(post => (
          <li key={post.id} className="">
            {editingId === post.id ? (
              <div className="space-y-4 w-full max-w-lg">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Post title"
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium text-gray-800 shadow-sm"
              />
              <textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                placeholder="Write your post content..."
                rows={5}
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-700 shadow-sm resize-none"
              />
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => saveEdit(post.id)}
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-5 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
            ) : (
              <div>
                <h2 className="text-m md:text-xl pl-2 my-2 border-l-4  font-sans font-bold border-blue-400  dark:text-gray-600">{post.title}</h2>
                <p className="">{post.body}</p>
                <div className="">
                  <button
                    onClick={() => onView(post.id)}
                    className="px-4 py-1 my-4 bg-gradient-to-r from-blue-500 to-purple-500 
    text-white font-bold rounded-full transition-transform transform-gpu 
    hover:-translate-y-1 hover:shadow-lg"
                  >
                    View
                  </button>
                  <button
                    onClick={() => startEditing(post)}
                    className="px-4 py-1 my-4 bg-gradient-to-r from-blue-500 to-purple-500 
    text-white font-bold rounded-full transition-transform transform-gpu 
    hover:-translate-y-1 hover:shadow-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(post.id)}
                    className="px-4 py-1 my-4 bg-gradient-to-r from-blue-500 to-purple-500 
    text-white font-bold rounded-full transition-transform transform-gpu 
    hover:-translate-y-1 hover:shadow-lg"
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