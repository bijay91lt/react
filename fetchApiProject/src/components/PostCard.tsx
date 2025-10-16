import { useState, useEffect } from "react";

const API_BASE = 'https://jsonplaceholder.typicode.com';

interface Post{
    userId: number;
    id: number;
    title : string;
    body: string;
}

interface Comment {
    id: number;
    postId: number;
    name: string;
    email:string;
    body:string;
}
interface PostCardProps{
    postId: number
}

function PostCard({ postId}: PostCardProps) {
    const [post, setPost] = useState<Post | null> (null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try{
                setLoading(true);
                setError(null);

                //fetch sinlgle post: GET /posts/{id}
                const postRes = await fetch (`${API_BASE}/posts/${postId}`);
                if(!postRes.ok) throw new Error('Failed to fetch post');
                const postData: Post = await postRes.json();

                //Fetch comments: GET /posts/{id}/comments
                const commentsRes = await fetch(`${API_BASE}/posts/${postId}/comments`);
                if(!commentsRes.ok) throw new Error('Failed to fetch comments');
                const commentsData: Comment[] = await commentsRes.json();

                setPost(postData);
                setComments(commentsData);
            } catch (error) {
                alert('Failed to update post:'+{error});
            } finally{
                setLoading(false);
            }
        };

        fetchPostAndComments();
    }, [postId]);

    if(loading) return <div className="">Loading post ...</div>
    if(error) return <div className="">Error: {error}</div>
    if(!post) return <div className="">Post not found</div>

  return (
    <>
    <div className="p-6">
      <h2 className="text-m md:text-xl pl-2 my-2 border-l-4  font-sans font-bold border-blue-400  dark:text-gray-600">{post.title}</h2>
      <p className="">{post.body}</p>

      <div className="p-6">
        <h3 className="text-m md:text-xl pl-2 my-2 border-l-4  font-sans font-bold border-blue-400  dark:text-gray-600">Comments ({comments.length})</h3>
        {comments.length === 0 ? (
          <p>No comments.</p>
        ) : (
          <ul className="flex flex-col gap-3.5 w-full">
            {comments.map(comment => (
              <li key={comment.id} className="flex flex-col gap-3.5 w-full">
                <div className="text-m md:text-xl pl-2 my-2 border-l-4  font-sans font-bold  dark:text-gray-600">{comment.name}</div>
                <div className="text-m md:text-xl pl-2 my-2 border-l-4  font-sans font-bold  text-blue-600">{comment.email}</div>
                <p className="flex flex-col gap-3.5 w-full">{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
  );
}

export default PostCard