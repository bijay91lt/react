interface Post{
    id: number;
    title : string;
    body: string;
    userId: number;
}

interface PostCardProps{
    post: Post;
}

function PostCard({ post}: PostCardProps) {
  return (
    <div className="bg-blue-200">
        <h2 className="text-black-400"> {post.title}</h2>
        <p className="text-gray-800">{post.body}</p>
    </div>
  )
}

export default PostCard